using AngularAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAPI.DataAccessLayer
{
    public class EmployeeDataAccessLayer
    {
        //处理数据库操作
        xucyContext db = new xucyContext();

        //获取员工信息
        public IEnumerable<TblEmployee> GetAllEmployee(){
            try
            {
                return db.TblEmployee.ToList();
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //添加员工信息
        public int AddEmployee(TblEmployee employee) {
            try
            {
                db.TblEmployee.Add(employee);
                db.SaveChanges();

                return 1;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //更新员工信息
        public int UpdateEmployee(TblEmployee employee) {
            try
            {
                db.Entry(employee).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //删除员工信息
        public int DeleteEmployee(int id) {
            try
            {
                TblEmployee emp = db.TblEmployee.Find(id);
                db.TblEmployee.Remove(emp);
                db.SaveChanges();

                return 1;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //获取特定员工信息
        public TblEmployee GetEmployeeData(int id) {
            try
            {
                TblEmployee emp = db.TblEmployee.Find(id);
                return emp;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public IEnumerable<TblEmployee> GetmployeeList(string sname,string sgender,string sdept,string scity)
        {
            try
            {
                var data = from u in db.TblEmployee select u;
                if (!string.IsNullOrEmpty(sname))
                {
                    data = data.Where(p => p.Name.Contains(sname));
                }
                if (!string.IsNullOrEmpty(sgender))
                {
                    data = data.Where(p => p.Gender == sgender);
                }
                if (!string.IsNullOrEmpty(sdept))
                {
                    data = data.Where(p => p.Department.Contains(sdept));
                }
                if (!string.IsNullOrEmpty(scity))
                {
                    data = data.Where(p => p.City == scity);
                }
                return data.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
