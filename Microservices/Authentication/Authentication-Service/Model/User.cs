using Microsoft.AspNetCore.Identity;

namespace Authentication_Service.Model
{
    public class User:IdentityUser
    {
        public string firstname { get; set; } = string.Empty;
        public string lastname { get; set; }= string.Empty;      
      
    }
}
