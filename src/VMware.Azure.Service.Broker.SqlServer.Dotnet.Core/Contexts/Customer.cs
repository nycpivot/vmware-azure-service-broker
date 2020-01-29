using System.ComponentModel.DataAnnotations;

namespace VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Contexts
{
    public class Customer
    {
        [Key]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}