using Microsoft.AspNetCore.Mvc;
using CarDB.Service.Repository;
using CarDB.Model;
using AutoMapper;

namespace CarDB.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("v1")]
    public class CarDBController : ControllerBase
    {
        private readonly ICarRepository _carRepository;
        private readonly IMapper _mapper;

        public CarDBController(ICarRepository carRepository, IMapper mapper)
        {
            _carRepository = carRepository;
            _mapper = mapper;
        }

        [Route("cars")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return new JsonResult(_carRepository.GetAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Route("cars/{id}")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                var car = _carRepository.GetById(id);

                if (car == null)
                    return NotFound();

                return new JsonResult(_carRepository.GetById(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Route("cars/new")]
        [HttpPost]
        public IActionResult New([FromBody] CarViewModel car)
        {
            try
            {
                _carRepository.Insert(_mapper.Map<CarModel>(car));

                return new JsonResult(new
                {
                    status = true
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Route("cars/update")]
        [HttpPost]
        public IActionResult Update([FromBody] CarViewModel car)
        {
            try
            {

                _carRepository.Update(_mapper.Map<CarModel>(car));

                return new JsonResult(new
                {
                    status = true
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Route("cars/delete/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var car = _carRepository.GetById(id);

                if (car != null)
                {
                    _carRepository.Delete(car);

                    return new JsonResult(new
                    {
                        status = true
                    });
                }

                throw new System.Exception("Car doesn´t exist");
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
