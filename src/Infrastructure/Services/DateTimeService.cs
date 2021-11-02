using WarehouseShop.Application.Common.Interfaces;
using System;

namespace WarehouseShop.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
