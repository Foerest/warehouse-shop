using WarehouseShop.Domain.Common;
using WarehouseShop.Domain.Entities;

namespace WarehouseShop.Domain.Events
{
    public class VehicleBoughtEvent : DomainEvent
    {
        public VehicleBoughtEvent(Vehicle item)
        {
            Item = item;
        }

        public Vehicle Item { get; }
    }
}
