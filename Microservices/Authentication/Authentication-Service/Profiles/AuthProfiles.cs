using Authentication_Service.Model;
using Authentication_Service.Model.Dtos;
using AutoMapper;

namespace Authentication_Service.Profiles
{
    public class AuthProfiles:Profile
    {
        public AuthProfiles()
        {
            CreateMap<RegisterRequestDto, User>()
                .ForMember(dest => dest.UserName, u => u.MapFrom(reg => reg.Email));

            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
