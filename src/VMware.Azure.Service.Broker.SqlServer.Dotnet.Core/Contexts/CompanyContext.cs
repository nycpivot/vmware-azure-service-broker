using Microsoft.EntityFrameworkCore;

namespace VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Contexts
{
    public class CompanyContext : DbContext
    {
        public CompanyContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
    }
}