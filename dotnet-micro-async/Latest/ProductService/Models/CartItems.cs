using Microsoft.EntityFrameworkCore;

namespace ProductService.Models
{
    public class CartItems
    {     
        public List<CartItem> cartItems { get; set; }
       //public int Count { get; set; }
    }
}
