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
    public class PolicyApprovalsController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;

        public PolicyApprovalsController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }

        // GET: api/PolicyApprovals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PolicyApproval>>> GetPolicyApproval()
        {
            return await _context.PolicyApproval.Include(p => p.PolicyRequest).ThenInclude(pr => pr.Employee).Where(p => !p.Retired).ToListAsync();
        }

        // GET: api/PolicyApprovals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PolicyApproval>> GetPolicyApproval(int id)
        {
            var policyApproval = await _context.PolicyApproval.Include(p => p.PolicyRequest).ThenInclude(pr => pr.Employee).Where(p => !p.Retired && p.ApprovalId == id).FirstOrDefaultAsync();

            if (policyApproval == null)
            {
                return NotFound();
            }

            return policyApproval;
        }

        // PUT: api/PolicyApprovals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPolicyApproval(int id, PolicyApproval policyApproval)
        {
            if (id != policyApproval.ApprovalId)
            {
                return BadRequest();
            }

            _context.Entry(policyApproval).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PolicyApprovalExists(id))
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

        // POST: api/PolicyApprovals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PolicyApproval>> PostPolicyApproval(PolicyApproval policyApproval)
        {
            if (policyApproval.Status)
            {
                var policyRequest = _context.PolicyRequest.Find(policyApproval.RequestId);
                var policyRequestDuration = (int)policyRequest.Amount / (int)policyRequest.Emi;
                var policyEmployee = new PolicyEmployee()
                {
                    Emi = policyRequest.Emi,
                    Amount = policyRequest.Amount,
                    Duration = policyRequestDuration,
                    EmployeeId = policyRequest.EmployeeId,
                    PolicyId = policyRequest.PolicyId,
                    EffectiveDate = DateTime.Now,
                    ExpiredDate = DateTime.Now.AddMonths(policyRequestDuration),
                    Retired = false,
                    Status = true
                };
                 _context.PolicyEmployee.Add(policyEmployee);
            }

            _context.PolicyApproval.Add(policyApproval);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetPolicyApproval", new { id = policyApproval.ApprovalId }, policyApproval);
        }

        // DELETE: api/PolicyApprovals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PolicyApproval>> DeletePolicyApproval(int id)
        {
            var policyApproval = await _context.PolicyApproval.FindAsync(id);
            if (policyApproval == null)
            {
                return NotFound();
            }

            _context.PolicyApproval.Remove(policyApproval);
            await _context.SaveChangesAsync();

            return policyApproval;
        }

        private bool PolicyApprovalExists(int id)
        {
            return _context.PolicyApproval.Any(e => e.ApprovalId == id);
        }
    }
}
