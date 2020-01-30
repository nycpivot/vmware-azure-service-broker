using Microsoft.AspNetCore.Mvc;
using System.Linq;
using VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Contexts;

namespace VMware.Azure.Service.Broker.SqlServer.Dotnet.Core.Controllers
{
    public class ProductsController : Controller
    {
        private readonly CompanyContext companyContext;

        public ProductsController(CompanyContext companyContext)
        {
            this.companyContext = companyContext;
        }

        public IActionResult Index()
        {
            ViewBag.Products = companyContext.Products.ToList();

            return View();
        }
    }
}