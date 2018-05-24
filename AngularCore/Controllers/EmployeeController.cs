using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularAPI.DataAccessLayer;
using AngularAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularCore.Controllers
{
    public class EmployeeController : Controller
    {
        EmployeeDataAccessLayer objemployee = new EmployeeDataAccessLayer();

        // GET: api/<controller>/URL
        [HttpGet]
        [Route("~/api/Employee/Index")]
        public IEnumerable<TblEmployee> Index()
        {
            return objemployee.GetAllEmployee();
        }

        // GET: api/<controller>/URL
        [HttpPost]
        [Route("~/api/Employee/Create")]
        public int Create([FromBody] TblEmployee employee)
        {
            return objemployee.AddEmployee(employee);
        }

        // GET: api/<controller>/URL
        [HttpGet]
        [Route("~/api/Employee/Details/{id}")]
        public TblEmployee Details(int id)
        {
            return objemployee.GetEmployeeData(id);
        }

        [HttpPut]
        [Route("~/api/Employee/Edit")]
        public int Edit([FromBody] TblEmployee employee)
        {
            return objemployee.UpdateEmployee(employee);
        }

        [HttpDelete]
        [Route("~/api/Employee/Delete/{id}")]
        public int Delete(int id)
        {
            return objemployee.DeleteEmployee(id);
        }

        [HttpGet]
        [Route("~/api/Employee/GetCityList")]
        public IEnumerable<TblCities> Details()
        {
            CitiesDataAccessLayer objCities = new CitiesDataAccessLayer();
            return objCities.GetCities();
        }

        [HttpPost]
        [Route("~/api/Employee/GetempList")]
        public IEnumerable<TblEmployee> GetempList([FromBody] Object employee)
        {
            dynamic json = Newtonsoft.Json.Linq.JObject.Parse(employee.ToString());
            return objemployee.GetmployeeList(Convert.ToString(json["name"]), Convert.ToString(json["gender"]), Convert.ToString(json["department"]), Convert.ToString(json["city"]));
        }

    }
}
