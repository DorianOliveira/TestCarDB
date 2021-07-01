using AutoMapper;
using CarDB.Model;

namespace CarDB.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CarModel, CarViewModel>().ReverseMap();
        }
    }
}
