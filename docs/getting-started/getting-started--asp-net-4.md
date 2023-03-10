# Getting started for ASP.NET 4

> NB: The fastest way to apply EasyQuery to your ASP.NET 4 project is to clone the whole [EasyQuery samples Git repository](https://github.com/easyquery/Net4Samples), play with the demo project for MVC or WebForms from that repository and then copy necessary parts from that project to your own one.

Below you will find the steps you need to do if you are going to add EasyQuery to your ASP.NET application from the scratch. The instructions are applied both for MVC and WebForms projects (with few little differences). It might look odd (since these two frameworks are tootally different) but it stems from how our demo projects are built.

The main work on the client-side is done by our EasyQuery JavaScript library, so the view engine (Razor in MVC or .aspx in WebForms) is responsible only for the plain HTML rendering in this case and the sever-side part is covered by WebAPI library which is the same on both platforms.

So, let's start.

## 0. Prerequisites

### 0.1 Register your trial version

To start using EasyQuery trial you need to [register and get your trial version keys](https://korzh.com/easyquery#get-started) first.   
It will take 1-2 minutes of your time. On registration you will get access to a special "Client's Area" of our web-site where you can see available licenses, get the keys, and submit a support request if necessary.

### 0.2 Choose the way you will work with your data model

Data model - is a user-friendly representation of your project's database which is used by different EasyQuery components to show available entities, their attributes, conditional operators and the lists of available values during the query building process. So, first of all, you will need to choose the way you create your data model and/or load it in your application. There are several different ways of doing this.

For more information please read [Working with data model in EasyQuery](/$aid/d3296080-f7cd-4e32-b6ea-1e5319948c82) article first.

In this article, we assume that you use Entity Framework in your project and so, load your model directly from DbContext.

## 1. Install EasyQuery packages

Obviously, first thing you will need to do - is to add EasyQuery NuGet packages to your project. You can use whatever way you prefer to do it: via NuGet Package Manager UI, using Package Manager Console or manually editing .csproj file and adding necessary `<PackageReference ...` nodes into it.

The only package which is absolutely required to apply EasyQuery to ASP.NET is:

- [Korzh.EasyQuery.AspNet4](https://www.nuget.org/packages/Korzh.EasyQuery.AspNet4/)

In some cases you might also need to add the following packages:

- [Korzh.EasyQuery.EntityFramework6](https://www.nuget.org/packages/Korzh.EasyQuery.EntityFramework6/) - if your project uses Entity Framework 6.x.
- [Korzh.EasyQuery.DataExport](https://www.nuget.org/packages/Korzh.EasyQuery.DataExport/)   - if you want to add some data exporting functionality.
- [Korzh.EasyQuery.Linq](https://www.nuget.org/packages/Korzh.EasyQuery.Linq/)  - if you want to implement a [data filtering scenario](https://korzh.com/demo/easyquery-asp-net-core-razor/data-filtering) in your project.

## Step 2: Setup WebAPI controller

Server-side part of EasyQuery works via a WebAPI controller which handles all AJAX requests from the JS widgets placed on the view.
While this is a usual thing for ASP.NET MVC / WebAPI applications, for a WebForms project it might look quite odd. But don't worry, it works well, we tried!

### 2.1 Install WebAPI NuGet packages

EasyQuery's server-side part is implemented as a WebAPI controller. So, if you don't use WebAPI in your web-application yet - you will need to add some NuGet packages to your project:

* `Microsoft.AspNet.WebApi.Core` (it must be installed together with `Korzh.EasyQuery.AspNet4` but you might want to update it to the latest version)
* `Microsoft.AspNet.WebApi.WebHost`

### 2.2 Add WebApiConfig.cs

After installing WebAPI package you will also need to add a special configuration file (`App_Start/WebApiConfig.cs`) and modify your `Global.asax.cs`.

The simplest way will be to get that [file from our sample project on GitHub](https://github.com/easyquery/Net4Samples/blob/master/EqAspNet4Demo/App_Start/WebApiConfig.cs) and copy it to `App_Start` folder in your project (or to merge with the one you are using now).

Please note, we have re-configured the default WebAPI routing mechanism to make it use the attributes from the base controller classes (because they are not taken into the account by default). It is necessary for a proper work of the new WebAPI controller you will add on the next step. The routes for all controller's actions are defined in the base class - that's why we need that routing inheritance to be turned on.

> __NB1__: The last solution about enabling the routing inheritance attributes works only with WebAPI version 2.2 or higher.  So, if your project uses an older version of WebAPI packages - please upgrade them first.

> __NB2__: `WebApiConfig.cs` from our sample contains also 2 `RegisterExporter` calls which register the exporters for CSV and HTML formats. You can comment those two lines for the moment. If you want to add the exporting functionality - you can later install `Korzh.EasyQuery.DataExport` package and uncomment those two lines back.



###  2.3 Modify Global.asax.cs

After that we need to update `Global.asax.cs` file in your project to register WebAPI services and routes. Here is an example of this file from our samples:

* [for MVC project](https://github.com/easyquery/Net4Samples/blob/master/EqAspNet4Demo/Global.asax.cs)
* [for WebForms project](https://github.com/easyquery/Net4Samples/blob/master/EqWebFormsDemo/Global.asax.cs)

Merge the content of one of these files (depending on what type of project you have) with `Global.asax.cs` in your project.

Additionally `Application_Start` method of Global.asax.cs file is a good place to set your trial license keys for EasyQuery that you got on the Step 0:

```

protected void Application_Start()
{
    Korzh.EasyQuery.AspNet.License.Key = "Your license key for EasyQuery ASP.NET goes here";
    Korzh.EasyQuery.AspNet.JsLicense.Key = "Your license key for EasyQuery.JS goes here";
	.    .    .    .    .
}

```

### 2.4 Add new API controller

To simplify the task we prepare a base class for such controller from which you can derive your own one.
All necessary endpoints (actions) are already defined and properly handled in that basic class. So, all you need to do is to set some options in the overridden virtual method `ConfigureEasyQueryOptions`.

Here are the controllers you can use:

- [For MVC project](https://github.com/easyquery/Net4Samples/tree/master/EqAspNet4Demo/Controllers/EasyQuery): AdvancedSearchController or EasyReportController
- [For WebForms project](https://github.com/easyquery/Net4Samples/tree/master/EqWebFormsDemo/Controllers): AdvancedSearchController


Just download the controller of your choice and place it to the `Controllers/EasyQuery` folder in your MVC project (or to `Controllers` folder for WebForms one). Obviously, you will also need to change the namespace ID from `EqAspNet4Demo.Controllers` to `YourProjectDefaultNamespace.Controllers`.

For "EasyReportController" you will also need to copy to your project [the service classes](https://github.com/easyquery/Net4Samples/tree/master/EqAspNet4Demo/Services) which is used for caching and query(reports) saving.

As it was mentioned above, to adjust the new contoller for your application you just need to modify a few lines in `ConfigureEasyQueryOptions` procedure:

1. First of all, change the ID of the data model in  `options.DefaultModelId = ...` line or remove it completely if you plan to load your model from DbContext
2. Modify the name of your connection string parameter (if it's not `DefaultConnection` as in example)
3. Change the way you are going to load your data model. In our sample we are using the model created with Data Model Editor and saved as NWindSQL.xml file in App_Data folder. If you plan to load your model directly from your DbContext - then remove `options.UseModelLoader(...);` line and replace it with the following:

```c#
var dbContext = ApplicationDbContext.Create();
options.UseDbContext(dbContext);
```

5. Finally, you might want to change the type of the connection in `options.UseDbConnection<..>()` call if you use another than SQL Server database (e.g. `MySqlConnection` or `OracleConnection`)


## 3. Add a new view/page

The next step will be to add a page which introduces an advanced search or ad-hoc reporting functionality in your project. This is the part which differs for MVC and WebForms projects.
In case of MVC project you will need to add a new view and a corresponding controller's action. In WebForms - it will be an `.aspx` file with a code-behind `.aspx.cs`

We are going to cover both those cases below.

### 3.1 For MVC projects

The simplest way to do it - is to copy the page you need from our sample project. Here are the direct links:

- [Advanced search view](https://github.com/easyquery/Net4Samples/blob/master/EqAspNet4Demo/Views/Home/AdvancedSearch.cshtml)
- [Ad-hoc reporting](https://github.com/easyquery/Net4Samples/blob/master/EqAspNet4Demo/Views/Home/AdHocReporting.cshtml)

Of course, you will need to add a corresponding controller action for the new view so it will be accessible by some URL. In our sample we add those actions to the [Home controller](https://github.com/easyquery/Net4Samples/blob/master/EqAspNet4Demo/Controllers/HomeController.cs) but it can be any other controller in your own project of course.

Here is how such new action can look like:

```
public class HomeController : Controller
{
        .     .     .     . 
    public ActionResult AdvancedSearch()
    {
        return View();
    }
}
```

> __NB__: About `Styles` section
Please note that some styles in our advanced-search view are placed into `Styles` section. So, you will either need to add `@RenderSection("Styles", required: false)` line to your `Views/Shared/_Layout.chstml` or to move those stylesheet links outside the `Styles` secition in your AdvancedSearch.cshtml


### 3.2 For WebForms

As for MVC you can just take the [page from our sample](https://github.com/easyquery/Net4Samples/blob/master/EqWebFormsDemo/EasyQuery.aspx). Here is the [code behind class](https://github.com/easyquery/Net4Samples/blob/master/EqWebFormsDemo/EasyQuery.aspx.cs) for that page as well.


## Build. Run. Enjoy!

That's it. If everything was done right on the previous steps - your application will be built and run sucessfully and you can open and you will be able to open new page by the path you specified on the step 3.1 (e.g. `/Home/AdvancedSearch` if you leave it as it's listed there).

If something goes wrong - feel free to contact us: you can [create an issue on GitHub](https://github.com/easyquery/Net4Samples/issues) or [submit a support request](https://korzh.com/support) on our website.