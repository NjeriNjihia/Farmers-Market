using Authentication_Service.Model;

namespace Authentication_Service.Services.IService
{
    public interface IJwtInterface
    {
        string GenerateToken(User user, IEnumerable<string> roles);
    }
}
