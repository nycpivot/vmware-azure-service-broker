using Microsoft.AspNetCore.Mvc;
using System.Linq;
using VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Contexts;

namespace VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Controllers
{
    public class CustomersController : Controller
    {
        private readonly CompanyContext companyContext;

        public CustomersController(CompanyContext companyContext)
        {
            this.companyContext = companyContext;
        }

        public IActionResult Index()
        {
            ViewBag.Customers = companyContext.Customers.ToList();

            return View();
        }
    }
}