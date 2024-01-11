using System.ComponentModel.DataAnnotations;

namespace Authentication_Service.Model.Dtos
{
    public class LoginRequestDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string password { get; set; }
    }
}
