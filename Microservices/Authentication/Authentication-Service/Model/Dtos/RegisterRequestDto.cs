namespace Authentication_Service.Model.Dtos
{
    public class RegisterRequestDto
    {
        public string firstname { get; set; } = string.Empty;

        public string lastname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
