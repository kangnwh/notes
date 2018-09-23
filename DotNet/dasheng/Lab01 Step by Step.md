# Lab01 Steps

[reference](https://docs.microsoft.com/en-au/aspnet/core/security/authentication/social/index?view=aspnetcore-2.1)

#### 1.1 Create MVC application using command:

```shell
dotnet new -l # to see what templates can be used

# create project based on template named 'mvc', with individual account management
dotnet new mvc -o Demo01 
```

#### 1.2 Start project with auto compling (for Mac)

1. start project by running

```shell
dotnet watch run
```

#### 2. How routing works

>  a. Explain `Configure() ` in file `Startup.cs`
>
>  b. Update `Contact()`  in file `HomeController.cs` for deep knowledge
>
>  Examples:

> - localhost:8080/Contact?name=kangning
>
> - localhost:8080/Contact/1
>
> - localhost:8080/Contact?id=1



#### 3. How controller works

a. Create `HelloWorld.cs` and returns simple strings

b. Update to return `View()` and see what errors are thrown.

b. Create `HelloWorld` folder under `Views` folder then create `Index.cshtml` under new folder



#### 4. How view works

a. Update `Home/Index.cshtml` 

​	- Add `<h1>Hello World</h1>`

b. Update `Shared/_Layout.cshtml`



#### 5. Configure login model

1. Add code generator

```shell
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Tools
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```

2. Generate Identity files (only Register for this class)

Hits: This will fail as we use SqLite as database, so we need to add SqLite package first and run above script again

```shell
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet restore

# generate models
# [Introduct] dotnet aspnet-codegenerator identity --listFiles
dotnet aspnet-codegenerator identity --dbContext Demo01DbContext --userClass Demo01User --useSqLite --files "Account.Register"

# generate default ui
dotnet aspnet-codegenerator identity --useDefaultUI --dbContext Demo01DbContext --force
```



2. Add authentication in `Startup.cs`

```c#
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    ...
    app.UseAuthentication();
    ...
}
```

4. Create database (in shell)

```shell
dotnet ef migrations add CreateIdentitySchema
dotnet ef database update
```

5. Try run - can run but no login/register buttons
6. Add Register/Login buttons on navigation bar

Add `<partial name="_LoginPartial" />` to file `_Layout.cshtml`

```html
...
<div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
                    <li><a asp-area="" asp-controller="Home" asp-action="About">About</a></li>
                    <li><a asp-area="" asp-controller="Home" asp-action="Contact">Contact</a></li>
                </ul>
	<partial name="_LoginPartial" />
</div>
...
```





#### 5. Try login

a. register

b. login

c. look into database settings/models

d. config Identify options

```c#
 services.Configure<IdentityOptions>((IdentityOptions obj) =>
            {
                // Password settings
                obj.Password.RequireDigit = true;
                obj.Password.RequireUppercase = false;
                obj.Password.RequiredLength = 6;
                obj.Password.RequireNonAlphanumeric = false;

            });
```



#### 6. Config Microsoft Identity

a. create app token for your app - check document [link](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/social/microsoft-logins?view=aspnetcore-2.1&tabs=aspnetcore2x)



b. add these infor in `appsettings.Development.json`

```swif
"Authentication": {
    "Microsoft": {
      "ApplicationId": "82b2ed2b-aa28-408f-b57c-5e258524c997",
      "Password": "dgcrtvJNQN66867(bYJE${;"
    }
  }
```

c. configure your Microsoft Account login process

```swift
services.AddAuthentication().AddMicrosoftAccount(microsoftOptions =>
            {
                microsoftOptions.ClientId = Configuration["Authentication:Microsoft:ApplicationID"];
                microsoftOptions.ClientSecret = Configuration["Authentication:Microsoft:Password"];
            });
```



## 7. Add `CreateDate` into User table

1. Check existing user table

```shell
cd ~/dasheng/Demo01
sqlite3 Demo01.db
> .schema AspNetUsers
```

There is no field to indicate the creation time. We need to add one as assignment specification requires.

1. Update model in file `Areas/Identity/Data/Demo01.cs`

   - Update User model by creating new User class that inherit from original User Class

   ```c#
   public class Demo01User : IdentityUser
   {
       public DateTime CreateDateTime { set; get; }
   }
   ```

2. Update register process, store register time as `CreateDateTime `

update file `Areas/Identity/Pages/Account/Register.cshtml.cs`

```c#
public async Task<IActionResult> OnPostAsync(string returnUrl = null)
{
    ...
    var user = new Demo01User { UserName = Input.Email, Email = Input.Email, CreateDate = DateTime.Now };
    ...
}
```



3. Database migration

```shell
dotnet ef migrations add AddCreateDateForUser 
dotnet ef database update
```

check db



4. Try register a new user

