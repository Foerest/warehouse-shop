using WarehouseShop.Application.Common.Interfaces;
using Microsoft.Azure.Cosmos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarehouseShop.Domain.Common;

namespace WarehouseShop.Infrastructure.Services
{
    public class CosmosDbService<T> : ICosmosDbService<T> where T: DBCollection
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddItemAsync(T item)
        {
            await this._container.CreateItemAsync<T>(item, new PartitionKey(item.Id));
        }

        public async Task DeleteItemAsync(string id)
        {
            await this._container.DeleteItemAsync<T>(id, new PartitionKey(id));
        }

        public async Task<T> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<T> response = await this._container.ReadItemAsync<T>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

        }

        public async Task<IEnumerable<T>> GetItemsAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<T>(new QueryDefinition(queryString));
            var results = new List<T>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();

                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateItemAsync(string id, T item)
        {
            await this._container.UpsertItemAsync<T>(item, new PartitionKey(id));
        }

        public IOrderedQueryable<T> GetItemsAsync()
        {
            return this._container.GetItemLinqQueryable<T>();
        }
    }
}
