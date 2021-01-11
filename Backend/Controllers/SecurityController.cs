using HealthInsuranceWebServer.Data;
using HealthInsuranceWebServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace HealthInsuranceWebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private IConfiguration _config;
        private readonly HealthInsuranceWebServerContext _context;
        public SecurityController(IConfiguration config, HealthInsuranceWebServerContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost]
        [Route("Authorize")]
        public IActionResult CheckLogin(string username, string password)
        {
            Employee employee = new Employee();
            employee.Username = username;
            employee.Password = password;
            IActionResult response = Unauthorized();
            var Employee = AuthenticateEmployee(employee);
            if (Employee != null)
            {
                var tokenStr = GenerateJSONWebToken(Employee);
                response = Ok(new { token = tokenStr });
            }
            else
            {
                response = NotFound();
            }
            return response;
        }

        private Employee AuthenticateEmployee(Employee login)
        {
            Employee employee = null;
            var user = _context.Employee.Where(u=>u.Username.Contains(login.Username))?.FirstOrDefault();
            if(user != null)
            {
                if (login.Username == user.Username && login.Password == user.Password)
                {
                    employee = new Employee { EmployeeId = user.EmployeeId, LName = user.LName, FName = user.FName, Email = user.Email, Username = user.Username, Password = user.Password };
                }
            }
            return employee;
        }

        private string GenerateJSONWebToken(Employee Employee)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, Employee.LName+" "+Employee.FName),
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

    }
}
