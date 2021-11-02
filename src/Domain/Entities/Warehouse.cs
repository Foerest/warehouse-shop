using WarehouseShop.Domain.Common;

namespace WarehouseShop.Domain.Entities
{
    public class Warehouse: DBCollection
    {
        public Location Location { get; set; }
        public Car Cars { get; set; } // based on json you sent
    }
}
