using WarehouseShop.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using WarehouseShop.Domain.Common;
using System.Linq;

namespace WarehouseShop.Application.Common.Interfaces
{
    public interface ICosmosDbService<T> where T: DBCollection
    {
        Task<T> GetItemAsync(string id);
        Task AddItemAsync(T item);
        Task UpdateItemAsync(string id, T item);
        Task DeleteItemAsync(string id);
        Task<IEnumerable<T>> GetItemsAsync(string query);
        IOrderedQueryable<T> GetItemsAsync();
    }
}
