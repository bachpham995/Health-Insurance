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
    public class HospitalsController : ControllerBase
    {
        private readonly HealthInsuranceWebServerContext _context;

        public HospitalsController(HealthInsuranceWebServerContext context)
        {
            _context = context;
        }
        // GET: api/Hospitals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospital()
        {
            return await _context.Hospital.Where(h=>!h.Retired).Include(h=>h.Policies).ToListAsync();
        }

        // GET: api/Hospitals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(int id)
        {
            var hospital = await _context.Hospital.Include(h=>h.Policies).Where(h=>!h.Retired && h.HospitalId == id).FirstOrDefaultAsync();

            if (hospital == null)
            {
                return NotFound();
            }

            return hospital;
        }

        // PUT: api/Hospitals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHospital(int id, Hospital hospital)
        {
            if (id != hospital.HospitalId)
            {
                return BadRequest();
            }

            //_context.Entry(hospital).State = EntityState.Modified;
            _context.Update(hospital);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(hospital);
        }
        //api/Hospital/Search
        [HttpPost("Search")]
        public async Task<ActionResult<IEnumerable<Hospital>>> Search([FromForm] string hospitalName, [FromForm] string hospitalPhone,
        [FromForm] string hospitalDistrict, [FromForm] string hospitalStreet,
        [FromForm] String city, [FromForm] String hospitalCountry,
        [FromForm] String postalCode,String hospitalEmail)
        {
            var query = _context.Hospital.Include(ar => ar.Address).AsQueryable();

            if (hospitalName != null)
            {
                query = query.Where(h => h.HospitalName.Contains(hospitalName));
            }
            if (hospitalEmail != null)
            {
                query = query.Where(c => c.Email.Contains(hospitalEmail));
            }

            if (hospitalPhone != null)
            {
                query = query.Where(h => h.Phone.Contains(hospitalPhone));
            }

            if (hospitalDistrict != null)
            {
                query = query.Where(h => h.Address.District.Contains(hospitalDistrict));
            }

            if (hospitalStreet != null)
            {
                query = query.Where(h => h.Address.Street.Contains(hospitalStreet));
            }

            if (city != null)
            {
                query = query.Where(h => h.Address.City.Contains(city));
            }
            if (hospitalCountry != null)
            {
                query = query.Where(h => h.Address.Country.Contains(hospitalCountry));
            }
            if (postalCode != null)
            {
                query = query.Where(h => h.Address.PostalCode.Contains(postalCode));
            }
            return await query.ToListAsync();
        }

        // POST: api/Hospitals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Hospital>> PostHospital(Hospital hospital)
        {
            _context.Hospital.Add(hospital);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHospital", new { id = hospital.HospitalId }, hospital);
        }

        // DELETE: api/Hospitals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hospital>> DeleteHospital(int id)
        {
            var hospital = await _context.Hospital.FindAsync(id);
            if (hospital == null)
            {
                return NotFound();
            }

            hospital.Retired = true;
            _context.Hospital.Update(hospital);
            await _context.SaveChangesAsync();

            return hospital;
        }

        private bool HospitalExists(int id)
        {
            return _context.Hospital.Any(e => e.HospitalId == id);
        }

        [HttpPost("{file}")]
        [AcceptVerbs("Post")]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            string imageDir = "/imgs/hospital";
            await new ImageUpload().UploadFile(imageDir, file);
            return Ok(imageDir + "/" + file.FileName);
        }

    }
}
