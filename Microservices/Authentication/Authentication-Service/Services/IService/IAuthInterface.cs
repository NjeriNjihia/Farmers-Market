using Authentication_Service.Model;
using Authentication_Service.Model.Dtos;

namespace Authentication_Service.Services.IService
{
    public interface IAuthInterface
    {
        Task<string> RegisterUser (RegisterRequestDto newUser);
       Task<LoginResponseDto> LoginUser (LoginRequestDto LoginUser);

        Task<bool> AssignUserRole(string UserId, string Rolename);

        Task<List<User>> GetUsers();
    }
}
