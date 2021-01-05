using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    public class ImageUpload
    {

        private static readonly string FileUploadPath = Directory.GetCurrentDirectory();

        public async Task<IActionResult> UploadFile(string imageDir, IFormFile file){
            string uploads = Path.Combine(FileUploadPath, @"wwwroot"+imageDir);
            if (file.Length > 0) {
                string filePath = Path.Combine(uploads, file.FileName);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create)) {
                    await file.CopyToAsync(fileStream);
                }
            }
            return null;            
        }
    }
}