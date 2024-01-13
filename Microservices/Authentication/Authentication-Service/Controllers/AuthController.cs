using Authentication_Service.Model.Dtos;
using Authentication_Service.Services.IService;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authentication_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthInterface _authservice;
        private readonly ResponseDto _response;
        private readonly IMapper _mapper;

        public AuthController(IAuthInterface authservice, IMapper mapper)
        {
            _authservice = authservice;
            _response = new ResponseDto();
            _mapper = mapper;
        }

        //register user
        [HttpPost("Register")]
        public async Task<ActionResult<ResponseDto>> AddUser(RegisterRequestDto registerRequest)
        {
            var result = await _authservice.RegisterUser(registerRequest);
            if(!string.IsNullOrWhiteSpace(result))
            {
                _response.IsSuccess = false;
                _response.Message = result;
                return BadRequest(_response);
            }
            //send email to queue
            return Ok(_response);
        }
        //login user
        [HttpPost("Login")]
        public async Task<ActionResult<ResponseDto>> LoginUser(LoginRequestDto loginUser)
        {
            var result = await _authservice.LoginUser(loginUser);
            if(result.User == null)
            {
                _response.IsSuccess = false;
                _response.Message = "Invalid Credentials";
                return BadRequest(_response);
            }
            _response.obj = result;
            return Ok(_response);
        }

        //get users
        [HttpGet]
        public async Task<ActionResult<ResponseDto>> GetAllUsers()
        {
            var users = await _authservice.GetUsers();
            if (users.Count == 0)
            {
                _response.IsSuccess = false;
                _response.Message = "Could not fetch users";
                return BadRequest(_response);
            }
            _response.obj = users;
            return Ok(_response);
        }

        //assigning roles
        [HttpPost("AssigningRole")]
        public async Task<ActionResult<ResponseDto>> AssigningRole(Guid UserId, string Role)
        {
            var response = await _authservice.AssignUserRole(UserId.ToString(), Role);
            var users = await _authservice.GetUsers();
            var user = users.FirstOrDefault(u => u.Id == UserId.ToString());
            if (!response)
            {
                _response.IsSuccess = false;
                _response.Message = "An Error Occured";

                return BadRequest(_response);
            }
            //send email to user that they have been approved to be traders.
            _response.obj = response;
            return Ok(_response);
        }
    }
}
