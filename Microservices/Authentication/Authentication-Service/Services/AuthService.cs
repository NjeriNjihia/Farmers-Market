using Authentication_Service.Data;
using Authentication_Service.Model;
using Authentication_Service.Model.Dtos;
using Authentication_Service.Services.IService;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;

namespace Authentication_Service.Services
{
    public class AuthService : IAuthInterface
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IJwtInterface _jwtGenerator;

        public AuthService(IJwtInterface jwtToken, ApplicationDbContext context, IMapper mapper, RoleManager<IdentityRole> roleManager,UserManager<User> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtGenerator = jwtToken;
        }
        public Task<bool> AssignUserRole(string email, string Rolename)
        {
            throw new NotImplementedException();
        }

        public async Task<List<User>> GetUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                return users;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoginResponseDto> LoginUser(LoginRequestDto LoginUser)
        {
            try
            {
                //check if user exists
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == LoginUser.Username.ToLower());

                var passwordIsCorrect = await _userManager.CheckPasswordAsync(user, LoginUser.password);

                if (!passwordIsCorrect || user == null)
                {
                    new LoginRequestDto();
                }
                var roles = await _userManager.GetRolesAsync(user);
                var token = _jwtGenerator.GenerateToken(user, roles);
                var LoggedInUser = new LoginResponseDto()
                {
                    User = _mapper.Map<UserDto>(user),
                    Token = token
                };

                return LoggedInUser;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> RegisterUser(RegisterRequestDto newUser)
        {
            var user = _mapper.Map<User>(newUser);
            try
            {
                var res = await _userManager.CreateAsync(user, newUser.Password);
                return "";
            }catch(Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
