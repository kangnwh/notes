# Step by Step for Webapi with JWT

## 1. New webapi project

```shell
dotnet new webapi -o $project_name
```



## 2. ConfigurationHelper

```c#
using System;
using System.Configuration;
using System.Text;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace LuckyCrateApi.Helper
{
    public class ConfigurationHelper 
    {
        public DbConfiguration DbConfiguration { set; get; }

        public Security Security { set; get; }

        public static ConfigurationHelper Current { get; private set; } = null;

        public ConfigurationHelper() { }
        
        public static void SetConfiguration(IConfiguration _config) {

            Current = new ConfigurationHelper
            {
                DbConfiguration = new DbConfiguration()
                {
                    connectString = _config["ConnectionStrings:luckydb"],
                    //dbName = _config["GKBDB:Name"]
                },
                Security = new Security()
            };
            _config.GetSection("Security").Bind(Current.Security);

        }

        public static void SetConfiguration(ConfigurationHelper config)
        {
            Current = config;
        }
    }

    public class Security 
    { 
        public string Issuer { set; get; }
        public string Audience { set; get; }
        public string Key { set; get; }
        public int ExpiresInMinutes { set; get; }
    }

    public class DbConfiguration
    {
        public string connectString;
        //public string dbName;
    }
  
  // used for azure storage account
  	public class AzureStorage
    {
        public string AccessKey  { set; get; }
        public string BaseUrl  { set; get; }
        public string Container  { set; get; }
    }


}
```





## 3. Add JWT support

0. How it works (overview)

   a. User send username/password to server

   b. Server verify username/password and generate `token` back to user

   	|- Add useful info to `token` (like username, roles, other `claims`) so that server can decrypt it and get that information.

   c. User sends future requests with the `token` in header.

   d. Server `decrypts token` to get information inside it and do authorization checks.

   e. Handle this request to the real controller if authorization successes.



1. Add JWT package

```shell
dotnet add package JWT
```



2. Add `Authentication` service

####NOTE: `ValidateLifetime` must be cared, the default value is `true`, so that when generate token, an `expiredDate` must be provided

```c#
ConfigurationHelper.SetConfiguration(this.Configuration);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(cfg =>
                {
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = ConfigurationHelper.Current.Security.Issuer,
                        ValidateAudience = true,
                        ValidAudience = ConfigurationHelper.Current.Security.Audience,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationHelper.Current.Security.Key)),

                    };
                });
```



3. Configure `Startup.cs/Configure()` to use `UseAuthentication`

```c#
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // Enable middleware to serve generated Swagger as a JSON endpoint.
                app.UseSwagger();

                // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
                // specifying the Swagger JSON endpoint.
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
                
                app.UseCors("MyPolicy");

            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            
            app.UseStaticFiles();
//            app.UseCookiePolicy();
            app.UseAuthentication();

            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
```



4. Add configuration in `appsettings.json`

```json
"Security":{
      "Issuer":"localhost:5001",
      "Audience":"localhost:5001",
      "Key":"@#$!$RQFWE%T$^Y^*%$#@@$#RDFA#$"
  }
```



5. Extension to generate token back to user

```c#
public static class AuthorizationHelper
    {
        public static string GenerateJwt(this User user)
        {

            // If user is verified, add claims into token
            List<Claim> userInfoClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };


            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationHelper.Current.Security.Key));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationHelper.Current.Security.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: userInfoClaims,
                issuer: ConfigurationHelper.Current.Security.Issuer,//configuration["Security:Tokens:Issuer"],
                audience: ConfigurationHelper.Current.Security.Audience,// configuration["Security:Tokens:Audience"],
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;

        }

    }

    
```



6. Get `claims` from `token`

```c#
public static class IdentityExtension
    {
        public static int CurrentUserId(this ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) //null
            {
                return -1;
            }

            var userId = int.Parse(userIdClaim.Value);
            return userId;
        }

    }
```



7. Configure your access control

|- `[Authorize]` 

|- 

|- `[AllowAnonymous]`

|- 

