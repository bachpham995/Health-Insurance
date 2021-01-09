using System;
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
    public class PolicyRequestsController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;

        public PolicyRequestsController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }

        // GET: api/PolicyRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PolicyRequest>>> GetPolicyRequest()
        {
            return await _context.PolicyRequest
            .Include(pr => pr.Policy)
            .Include(pr => pr.Employee)
            .Where(pr=>!pr.Retired)
            .ToListAsync();
        }

        // GET: api/PolicyRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PolicyRequest>> GetPolicyRequest(int id)
        {
            var policyRequest = await _context.PolicyRequest
            .Include(pr => pr.Policy)
            .Include(pr => pr.Employee)
            .Where(pr=>!pr.Retired && pr.RequestId == id)
            .FirstAsync();    

            if (policyRequest == null)
            {
                return NotFound();
            }

            return policyRequest;
        }

        // PUT: api/PolicyRequests/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPolicyRequest(int id, PolicyRequest policyRequest)
        {
            if (id != policyRequest.RequestId)
            {
                return BadRequest();
            }

            _context.Entry(policyRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PolicyRequestExists(id))
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

        // POST: api/PolicyRequests
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PolicyRequest>> PostPolicyRequest(PolicyRequest policyRequest)
        {
            _context.PolicyRequest.Add(policyRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPolicyRequest", new { id = policyRequest.RequestId }, policyRequest);
        }

        // DELETE: api/PolicyRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PolicyRequest>> DeletePolicyRequest(int id)
        {
            var policyRequest = await _context.PolicyRequest.FindAsync(id);
            if (policyRequest == null)
            {
                return NotFound();
            }

            _context.PolicyRequest.Remove(policyRequest);
            await _context.SaveChangesAsync();

            return policyRequest;
        }

        private bool PolicyRequestExists(int id)
        {
            return _context.PolicyRequest.Any(e => e.RequestId == id);
        }
    }
}
