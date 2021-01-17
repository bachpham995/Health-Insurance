using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using HealthInsuranceWebServer.Data;
using HealthInsuranceWebServer.Models;
using Controllers;
using System.IO;

namespace HealthInsuranceWebServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFileController : ControllerBase
    {
        private static readonly string FileUploadPath = Directory.GetCurrentDirectory();
        private static readonly string DOC_DIRECTORY = "/documents";
        public UploadFileController(){}

        [HttpPost]
        // [Route("UploadFile/")]
        public async Task<IActionResult> UploadFile(IFormFile file){            
            try{
                string uploads = Path.Combine(FileUploadPath, @"wwwroot" + DOC_DIRECTORY);
                if (file.Length > 0) {
                    string filePath = Path.Combine(uploads, file.FileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create)) {
                        await file.CopyToAsync(fileStream);
                    }
                }
            }catch(Exception e){
                return NotFound(e.ToString());
            }
            return Ok();
        }
		
		
		

        [HttpGet]
        public IActionResult GetDocuments(){
            var files = Directory.GetFiles(Path.Combine(FileUploadPath, @"wwwroot" + DOC_DIRECTORY));
            List<Object> listFile = new List<Object>();
            foreach (var file in files)
            {
                var fileInfo = new FileInfo(file);
                listFile.Add(
                    new {FileName = fileInfo.Name, Type = fileInfo.Extension, CreateTime = fileInfo.CreationTime});   
            }

            return Ok(listFile);
        }
    }
}