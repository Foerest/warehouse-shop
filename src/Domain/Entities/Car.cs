using System.Collections.Generic;

namespace WarehouseShop.Domain.Entities
{
    public class Car
    {
        public string Location { get; set; }
        public IEnumerable<Vehicle> Vehicles { get; set; }
    }
}
