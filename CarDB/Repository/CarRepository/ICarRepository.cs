using CarDB.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDB.Service.Repository
{
    public interface ICarRepository
    {
        IEnumerable<CarModel> GetAll();
        CarModel GetById(int id);
        void Insert(CarModel car);
        void Delete(CarModel car);
        void Update(CarModel car);
    }
}
