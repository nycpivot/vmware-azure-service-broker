using System;
using System.ComponentModel.DataAnnotations;

namespace VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Contexts
{
    public class Product
    {
        [Key]
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Image { get; set; }
        public Double Price { get; set; }
    }
}