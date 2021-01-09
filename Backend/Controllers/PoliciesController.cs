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
    public class PoliciesController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;        

        public PoliciesController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }

        // GET: api/Policies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Policy>>> GetPolicy()
        {
            return await _context.Policy.Where(p => !p.Retired)
            .Include(p=>p.Hospital)
            .Include(p=>p.InsCompany)
            .Include(p=>p.PolicyRequests)
            .Include(p=>p.PolicyEmployees)
            .ToListAsync();
        }

        // GET: api/Policies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Policy>> GetPolicy(int id)
        {
            var policy = await _context.Policy.Where(p => !p.Retired && p.PolicyId == id)
            .Include(p=>p.Hospital)
            .Include(p=>p.InsCompany)
            .Include(p=>p.PolicyRequests)
            .Include(p=>p.PolicyEmployees)
            .FirstAsync<Policy>();

            if (policy == null)
            {
                return NotFound();
            }

            return policy;
        }

        // PUT: api/Policies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPolicy(int id, Policy policy)
        {
            if (id != policy.PolicyId)
            {
                return BadRequest();
            }

            _context.Entry(policy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PolicyExists(id))
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

        // POST: api/Policies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Policy>> PostPolicy(Policy policy)
        {
            int nextId = _context.Policy.Max(p => p.PolicyId) + 1;
            string policyNumber = DateTime.Now.Year.ToString() + "-";
            for (int i = 0; i < 5 - nextId.ToString().Length; i++)
            {
                policyNumber+="0";    
            }
            policyNumber+=nextId;
            policy.PolicyNumber = policyNumber;
            _context.Policy.Add(policy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPolicy", new { id = policy.PolicyId }, policy);
        }

        // DELETE: api/Policies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Policy>> DeletePolicy(int id)
        {
            var policy = await _context.Policy.FindAsync(id);
            if (policy == null)
            {
                return NotFound();
            }
            
            policy.Retired = true;
            _context.Policy.Update(policy);
            await _context.SaveChangesAsync();

            return policy;
        }

        private bool PolicyExists(int id)
        {
            return _context.Policy.Any(e => e.PolicyId == id);
        }
    }
}
