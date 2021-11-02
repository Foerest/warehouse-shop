using FluentValidation;

namespace WarehouseShop.Application.TodoItems.Commands.UpdateTodoItem
{
    public class BuyWarehouseVehiclesCommandValidator : AbstractValidator<BuyWarehouseVehiclesCommand>
    {
        public BuyWarehouseVehiclesCommandValidator()
        {
            RuleFor(v => v.Id)
                .NotEmpty();
            RuleFor(v => v.Name)
                .NotEmpty();
            RuleFor(v => v.VehicleIds)
                .NotEmpty();
        }
    }
}
