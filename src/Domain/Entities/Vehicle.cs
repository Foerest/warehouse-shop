using System;
using System.Collections.Generic;
using WarehouseShop.Domain.Common;
using WarehouseShop.Domain.Events;

namespace WarehouseShop.Domain.Entities
{
    public class Vehicle: IHasDomainEvent
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public bool Licensed { get; set; }
        public DateTime DateAdded { get; set; }

        private bool _bought;
        public bool Buy
        {
            get => _bought;
            set
            {
                if (value && !_bought)
                {
                    DomainEvents.Add(new VehicleBoughtEvent(this));
                }

                _bought = value;
            }
        }

        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}
