using WarehouseShop.Domain.Common;
using System.Threading.Tasks;

namespace WarehouseShop.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
