﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthInsuranceWebServer.Data;
using HealthInsuranceWebServer.Models;

namespace HealthInsuranceWebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PolicyEmployeesController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;

        public PolicyEmployeesController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }

        // GET: api/PolicyEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PolicyEmployee>>> GetPolicyEmployee()
        {
            return await _context.PolicyEmployee.ToListAsync();
        }

        // GET: api/PolicyEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PolicyEmployee>> GetPolicyEmployee(string id)
        {
            var policyEmployee = await _context.PolicyEmployee.FindAsync(id);

            if (policyEmployee == null)
            {
                return NotFound();
            }

            return policyEmployee;
        }

        // PUT: api/PolicyEmployees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPolicyEmployee(string id, PolicyEmployee policyEmployee)
        {
            if (id != policyEmployee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(policyEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PolicyEmployeeExists(id))
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

        // POST: api/PolicyEmployees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PolicyEmployee>> PostPolicyEmployee(PolicyEmployee policyEmployee)
        {
            _context.PolicyEmployee.Add(policyEmployee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PolicyEmployeeExists(policyEmployee.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPolicyEmployee", new { id = policyEmployee.EmployeeId }, policyEmployee);
        }

        // DELETE: api/PolicyEmployees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PolicyEmployee>> DeletePolicyEmployee(string id)
        {
            var policyEmployee = await _context.PolicyEmployee.FindAsync(id);
            if (policyEmployee == null)
            {
                return NotFound();
            }

            _context.PolicyEmployee.Remove(policyEmployee);
            await _context.SaveChangesAsync();

            return policyEmployee;
        }

        private bool PolicyEmployeeExists(string id)
        {
            return _context.PolicyEmployee.Any(e => e.EmployeeId == id);
        }
    }
}