using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AngularCore.Controllers
{
    public class loginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult login()
        {
            var s = Request.Form["inputUserName"];
            return RedirectToAction("Index", "Home");
        }
    }
}