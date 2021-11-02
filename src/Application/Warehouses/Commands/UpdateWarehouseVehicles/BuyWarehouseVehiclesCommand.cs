using WarehouseShop.Application.Common.Exceptions;
using WarehouseShop.Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using WarehouseShop.Domain.Entities;
using System.Linq;
using System;

namespace WarehouseShop.Application.TodoItems.Commands.UpdateTodoItem
{
    public class BuyWarehouseVehiclesCommand : IRequest
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<int> VehicleIds { get; set; }
    }

    public class BuyWarehouseVehiclesCommandHandler : IRequestHandler<BuyWarehouseVehiclesCommand>
    {
        private readonly ICosmosDbService<Warehouse> _client;

        public BuyWarehouseVehiclesCommandHandler(ICosmosDbService<Warehouse> client)
        {
            _client = client;
        }

        public async Task<Unit> Handle(BuyWarehouseVehiclesCommand request, CancellationToken cancellationToken)
        {
            var entity = await _client.GetItemAsync(request.Id.ToString());

            if (entity == null)
            {
                throw new NotFoundException(nameof(Warehouse), request.Id);
            }

            var vehicles = entity.Cars.Vehicles.Where(v => request.VehicleIds.Contains(v.Id));

            if (request.VehicleIds.Count() != vehicles.Count())
            {
                throw new ArgumentException("Vehicles are corrupted");
            }

            foreach (var vehicle in vehicles)
            {
                vehicle.Buy = true;
            }

            await _client.UpdateItemAsync(entity.Id.ToString(), entity);

            return Unit.Value;
        }
    }
}
