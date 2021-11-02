using WarehouseShop.Application.Common.Models;
using WarehouseShop.Application.TodoItems.Commands.UpdateTodoItem;
using WarehouseShop.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WarehouseShop.Domain.Entities;

namespace WarehouseShop.WebUI.Controllers
{
    [Authorize]
    public class WarehousesController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<Warehouse>>> GetWarehousesWithPagination([FromQuery] GetWarehousesWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, BuyWarehouseVehiclesCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
