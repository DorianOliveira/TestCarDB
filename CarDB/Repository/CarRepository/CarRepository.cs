using CarDB.Model;
using CarDB.Service.JsonHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace CarDB.Service.Repository
{
    public class CarRepository : ICarRepository
    {
       
        private readonly IJsonHelper<CarModel> _jsonHelper;

        public CarRepository(IJsonHelper<CarModel> jsonHelper)
        {
            _jsonHelper = jsonHelper;
        }

        public IEnumerable<CarModel> GetAll()
        {
            return _jsonHelper.GetAll();
        }

        public CarModel GetById(int id)
        {
            var cars = _jsonHelper.GetAll();
            return cars.Where(item => item.Id == id).FirstOrDefault();
        }

        public void Insert(CarModel car)
        {
            _jsonHelper.Insert(car);
        }

        public void Delete(CarModel car)
        {
            _jsonHelper.Delete(car);
        }

        public void Update(CarModel car)
        {
            _jsonHelper.Update(car);
        }
    }
}
