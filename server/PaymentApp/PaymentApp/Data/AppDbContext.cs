using Microsoft.EntityFrameworkCore;
using PaymentApp.Models;

namespace PaymentApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PaymentDetail> PaymentDetails => Set<PaymentDetail>();
    }
}
