using AngularAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularAPI.DataAccessLayer
{
    public class CitiesDataAccessLayer
    {
        //处理数据库操作
        xucyContext db = new xucyContext();

        //获取城市信息
        public List<TblCities> GetCities() {
            try
            {
                List<TblCities> list = new List<TblCities>();
                list = (from cityList in db.TblCities select cityList).ToList();
                return list;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
