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
    }
}
