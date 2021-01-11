using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthInsuranceWebServer.Data;
using HealthInsuranceWebServer.Models;
using Controllers;

namespace HealthInsuranceWebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;

        public EmployeesController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            return await _context.Employee.Where(e=>e.Role != 0)
            .Include(e=>e.PolicyRequests)
            .Include(e=>e.Feedbacks)
            .Include(e=>e.Notifications)
            .Include(e=>e.PolicyEmployees)
            .ToListAsync();
        }

        // GET: api/Employees/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employee
            .Where(e=>e.EmployeeId == id)
            .Include(e=>e.PolicyRequests)
            .Include(e=>e.Feedbacks)
            .Include(e=>e.Notifications)
            .Include(e=>e.PolicyEmployees)
            .FirstAsync();
            

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }
            
            //_context.Entry(employee).State = EntityState.Modified;            
            _context.Update(employee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        // DELETE: api/Employees/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.Retired = false;            
            _context.Employee.Update(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.EmployeeId == id);
        }

        [HttpPost("{file}")]
        [AcceptVerbs("Post")]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            string imageDir = "/imgs/employee";
            await new ImageUpload().UploadFile(imageDir, file);
            return Ok(imageDir + "/" + file.FileName);
        }
    }
}
