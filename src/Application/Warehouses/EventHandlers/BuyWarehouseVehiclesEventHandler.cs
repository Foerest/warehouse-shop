using WarehouseShop.Application.Common.Models;
using WarehouseShop.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace WarehouseShop.Application.TodoItems.EventHandlers
{
    public class BuyWarehouseVehiclesEventHandler : INotificationHandler<DomainEventNotification<VehicleBoughtEvent>>
    {
        private readonly ILogger<BuyWarehouseVehiclesEventHandler> _logger;

        public BuyWarehouseVehiclesEventHandler(ILogger<BuyWarehouseVehiclesEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(DomainEventNotification<VehicleBoughtEvent> notification, CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;

            _logger.LogInformation("WarehouseShop Domain Event: {DomainEvent}", domainEvent.GetType().Name);

            return Task.CompletedTask;
        }
    }
}
