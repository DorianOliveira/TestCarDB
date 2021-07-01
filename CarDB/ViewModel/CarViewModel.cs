using CarDB.Service.JsonHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDB.Model
{
    public class CarViewModel
    {
        public int Year { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
    }
}
