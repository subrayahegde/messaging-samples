using Microsoft.EntityFrameworkCore;

namespace ProductService.Data
{
    public class ProductServiceContext : DbContext
    {
        public ProductServiceContext (DbContextOptions<ProductServiceContext> options)
            : base(options)
        {
        }

        public DbSet<ProductService.Models.Product> Product { get; set; }
    }
}
