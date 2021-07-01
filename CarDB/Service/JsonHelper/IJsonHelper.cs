using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDB.Service.JsonHelper
{
    public interface IJsonHelper<T> where T : JsonModel
    {
        List<T> GetAll();
        void Insert(T item);
        void Update(T item);
        void Delete(T item);
    }
}