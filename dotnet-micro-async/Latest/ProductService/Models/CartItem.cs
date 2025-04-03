using Microsoft.EntityFrameworkCore;

namespace ProductService.Models
{
    public class CartItem
    {     
        public int ProductId { get; set; }
        public int Qty { get; set; }
    }
}
