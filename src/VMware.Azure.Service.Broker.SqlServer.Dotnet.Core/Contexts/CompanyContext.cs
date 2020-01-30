using Microsoft.EntityFrameworkCore;
using System;

namespace VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Contexts
{
    public class CompanyContext : DbContext
    {
        public CompanyContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = Guid.NewGuid().ToString(),
                    Code = "P89135",
                    Name = "Men's Caterpillar 6\" Steel Toe Work Boot",
                    Color = "Black",
                    Image = "P89135.jpg",
                    Price = 119.99
                },
                new Product
                {
                    Id = Guid.NewGuid().ToString(),
                    Code = "804-4037",
                    Name = "Men's Thorogood 6\" Composite Toe Metal Free Hiker Work Boot",
                    Color = "Brown",
                    Image = "804-4037.jpg",
                    Price = 154.99
                },
                new Product
                {
                    Id = Guid.NewGuid().ToString(),
                    Code = "642925",
                    Name = "Women's Puma Steel Toe Work Shoe",
                    Color = "Black",
                    Image = "642925.jpg",
                    Price = 109.99
                },
                new Product
                {
                    Id = Guid.NewGuid().ToString(),
                    Code = "RB307",
                    Name = "Women's Reebok Steel Toe Wedge Sole Work Shoe",
                    Color = "Black/Pink",
                    Image = "RB307.jpg",
                    Price = 99.99
                }
            );
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}