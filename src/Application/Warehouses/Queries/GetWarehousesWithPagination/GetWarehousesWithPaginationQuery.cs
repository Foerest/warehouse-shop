using System.Threading;
using System.Threading.Tasks;
using WarehouseShop.Application.Common.Interfaces;
using WarehouseShop.Application.Common.Mappings;
using WarehouseShop.Application.Common.Models;
using MediatR;
using WarehouseShop.Domain.Entities;

namespace WarehouseShop.Application.TodoItems.Queries.GetTodoItemsWithPagination
{
    public class GetWarehousesWithPaginationQuery : IRequest<PaginatedList<Warehouse>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetWarehousesWithPaginationQueryHandler : IRequestHandler<GetWarehousesWithPaginationQuery, PaginatedList<Warehouse>>
    {
        private readonly ICosmosDbService<Warehouse> _client;

        public GetWarehousesWithPaginationQueryHandler(ICosmosDbService<Warehouse> client)
        {
            _client = client;
        }

        public async Task<PaginatedList<Warehouse>> Handle(GetWarehousesWithPaginationQuery request, CancellationToken cancellationToken)
        {
            // TODO: use continuation token for pagination (load more)
            return await _client.GetItemsAsync()
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}
