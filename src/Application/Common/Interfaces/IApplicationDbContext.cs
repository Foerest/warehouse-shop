using System.Threading;
using System.Threading.Tasks;

namespace WarehouseShop.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
