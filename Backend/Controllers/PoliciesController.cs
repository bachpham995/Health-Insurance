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
    public class PoliciesController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;

        public PoliciesController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }

        [HttpPost("Search")]
        public async Task<ActionResult<IEnumerable<Policy>>> Search([FromForm]string policyNumber, [FromForm]string policyName,
         [FromForm]string companyName, [FromForm]string hospitalName,
         [FromForm]float minEmi = 0, [FromForm]float maxEmi = 0,
         [FromForm]float minAmount = 0, [FromForm]float maxAmount = 0)
        {
            var query = _context.Policy.Include(p => p.InsCompany).Include(p => p.Hospital).AsQueryable();

            if (policyNumber != null)
            {
                query = query.Where(p => p.PolicyNumber.Contains(policyNumber));
            }

            if (policyName != null)
            {
                query = query.Where(p => p.PolicyName.Contains(policyName));
            }

            if (companyName != null)
            {
                query = query.Where(p => p.InsCompany.InsCompanyName.Contains(companyName));
            }

            if (hospitalName != null)
            {
                query = query.Where(p => p.Hospital.HospitalName.Contains(hospitalName));
            }

            if (minEmi >= 0 && minEmi < maxEmi){                
                query = query.Where(p => Math.Round(p.Emi) <= Math.Round(maxEmi) && Math.Round(p.Emi) >= Math.Round(minEmi));
            }else if (minEmi >= 0 && maxEmi == 0){
                query = query.Where(p => Math.Round(p.Emi) >= Math.Round(minEmi));
            }

            if (minAmount >= 0 && minAmount < maxAmount){                
                query = query.Where(p => Math.Round(p.Amount) <= Math.Round(maxAmount) && Math.Round(p.Amount) >= Math.Round(minAmount));
            }else if (minAmount >= 0 && maxAmount == 0){
                query = query.Where(p => Math.Round(p.Amount) >= Math.Round(minAmount));
            }

            return await query.ToListAsync();

        }

        // GET: api/Policies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Policy>>> GetPolicy()
        {
            return await _context.Policy.Where(p => !p.Retired)
            .Include(p => p.Hospital)
            .Include(p => p.InsCompany)
            .Include(p => p.PolicyRequests)
            .Include(p => p.PolicyEmployees)
            .ToListAsync();
        }

        // GET: api/Policies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Policy>> GetPolicy(int id)
        {
            var policy = await _context.Policy.Where(p => !p.Retired && p.PolicyId == id)
            .Include(p => p.Hospital)
            .Include(p => p.InsCompany)
            .Include(p => p.PolicyRequests)
            .Include(p => p.PolicyEmployees)
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
            string month = DateTime.Now.Month.ToString().Length == 1?("0"+DateTime.Now.Month.ToString()):DateTime.Now.Month.ToString();
            string day = DateTime.Now.Date.ToString().Length == 1?("0"+DateTime.Now.Date.ToString()):DateTime.Now.Date.ToString();
            string policyNumber = DateTime.Now.Year.ToString() + "-" + month + day;
            for (int i = 0; i < 5 - nextId.ToString().Length; i++)
            {
                policyNumber += "0";
            }
            policyNumber += nextId;
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
