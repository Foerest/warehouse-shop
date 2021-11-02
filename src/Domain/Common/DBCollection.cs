namespace WarehouseShop.Domain.Common
{
    public abstract class DBCollection
    {
        // Primary
        public int Id { get; set; }
        // Partition
        public string Name { get; set; }
    }
}
