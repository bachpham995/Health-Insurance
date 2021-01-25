using HealthInsuranceWebServer.Data;
using HealthInsuranceWebServer.Email;
using HealthInsuranceWebServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private IConfiguration _config;
        private readonly HealthInsuranceWebServerContext _context;
        private readonly MailSender _sendMail;
        public SecurityController(IConfiguration config, HealthInsuranceWebServerContext context, MailSender mailSender)
        {
            _config = config;
            _context = context;
            _sendMail = mailSender;
        }

        [HttpGet]
        //[Route("Authorize")]
        public IActionResult CheckLogin([FromQuery] String username, [FromQuery] String password)
        {
            Employee employee = new Employee();
            employee.Username = username;
            employee.Password = password;
            IActionResult response = Unauthorized();
            var Employee = AuthenticateEmployee(employee);
            if (Employee != null)
            {
                var tokenStr = GenerateJSONWebToken(Employee);
                response = Ok(new {id = Employee.EmployeeId, userName = Employee.Username , role = Employee.Role ,token = tokenStr});
            }
            else
            {
                response = NoContent();
            }
            return response;
        }

        private Employee AuthenticateEmployee(Employee login)
        {
            if (login.Password == null)
            {
                return null;
            }
            var user = _context.Employee.FirstOrDefault(u => u.Username == login.Username);
            if (user != null)
            {
                if (login.Username == user.Username && login.Password == user.Password && !user.Retired)
                {
                    return user;
                }
            }
            return null;
        }

        private string GenerateJSONWebToken(Employee Employee)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Employee.EmployeeId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, Employee.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credential
                );
            var encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodeToken;
        }

        [Authorize]
        [HttpPost("ValidateToken")]
        public string ValidateToken([FromQuery] String token)
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                IEnumerable<Claim> claims = identity.Claims;
                var id = claims.First().Value;
                return id;
            }
            return null;
        }

        [HttpGet("ForgetEmail")]
        public IActionResult ForgetPassword([FromQuery]string email)
        {
            if (email == null)
            {
                return NotFound();
            }
            var user = _context.Employee.Where(emp => emp.Email.Contains(email)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            var data = user.EmployeeId + "|" + user.Email;
            var encodedToken = Encoding.UTF8.GetBytes(data);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);
            var url = $"http://localhost:3000/changepassword/{validToken}";

            var message = new Message(new string[] { email }, "Reset Password", "<h1>Follow the intructions to reset your password</h1>" + $"<p>To reset your password <a href='{url}'>Click Here</a></p>");
            _sendMail.SendEmail(message);
            return Ok();
        }

        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword([FromForm]string token, [FromForm]string password)
        {
            var data = WebEncoders.Base64UrlDecode(token);
            string stringToken = Encoding.UTF8.GetString(data);
            string[] baseData = stringToken.Split("|");
            var user = _context.Employee.Find(Int32.Parse(baseData[0]));
            user.Password = password;
            _context.Employee.Update(user);
            _context.SaveChanges();

            return Ok();
        } 
    }
}