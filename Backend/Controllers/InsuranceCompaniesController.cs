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
    public class InsuranceCompaniesController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;

        public InsuranceCompaniesController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }

        [HttpPost("{file}")]
        [AcceptVerbs("Post")]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            string imageDir = "/imgs/company";
            await new ImageUpload().UploadFile(imageDir, file);
            return Ok(imageDir + "/" + file.FileName);
        }        

        // GET: api/InsuranceCompanies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InsuranceCompany>>> GetInsuranceCompany()
        {
            return await _context.InsuranceCompany.Where(elt=>!elt.Retired).Include(c => c.Policies).ToListAsync();
        }

        // GET: api/InsuranceCompanies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InsuranceCompany>> GetInsuranceCompany(int id)
        {
            var insuranceCompany = await _context.InsuranceCompany.Where(elt=>!elt.Retired && elt.InsuranceCompanyId == id).FirstAsync();

            if (insuranceCompany == null)
            {
                return NotFound();
            }

            return insuranceCompany;
        }

        // PUT: api/InsuranceCompanies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInsuranceCompany(int id, InsuranceCompany insuranceCompany)
        {
            if (id != insuranceCompany.InsuranceCompanyId)
            {
                return BadRequest();
            }

            // _context.Entry(insuranceCompany).State = EntityState.Modified;
            _context.InsuranceCompany.Update(insuranceCompany);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InsuranceCompanyExists(id))
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

        // POST: api/InsuranceCompanies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<InsuranceCompany>> PostInsuranceCompany(InsuranceCompany insuranceCompany)
        {
            _context.InsuranceCompany.Add(insuranceCompany);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInsuranceCompany", new { id = insuranceCompany.InsuranceCompanyId }, insuranceCompany);
        }

        // DELETE: api/InsuranceCompanies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<InsuranceCompany>> DeleteInsuranceCompany(int id)
        {
            var insuranceCompany = await _context.InsuranceCompany.FindAsync(id);
            if (insuranceCompany == null)
            {
                return NotFound();
            }
            insuranceCompany.Retired = true;            
            _context.InsuranceCompany.Update(insuranceCompany);
            await _context.SaveChangesAsync();
            return insuranceCompany;
        }

        private bool InsuranceCompanyExists(int id)
        {
            return _context.InsuranceCompany.Any(e => e.InsuranceCompanyId == id);
        }
    }
}
