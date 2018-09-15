# Step by Step for Webapi with JWT

## 1. New webapi project

```shell
dotnet new webapi -o $project_name
```



## 2. Add JWT support

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
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(cfg =>
                {
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidIssuer = Configuration["Security:Tokens:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = Configuration["Security:Tokens:Audience"],
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Security:Tokens:Key"])),
                    
                    };
                });
```



3. Configure `app` to use `UseAuthentication`

```c#
 app.UseAuthentication();
```



4. Add configuration in `appsettings.json`

```json
"Security":{
    "Tokens":{
      "Issuer":"localhost:5001",
      "Audience":"localhost:5001",
      "Key":"@#$!$RQFWE%T$^Y^*%$#@@$#RDFA#$"
    }
  }
```



5. Add `LoginController` to verify user login and generate/response token back to user

```c#

[Route("api/[controller]")]
    public class LoginController : Controller
    {
        private IConfiguration _configuration;

        public LoginController(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }

        [HttpPost("login")]
        public IActionResult Login(){
            var userInfoClaims = new[] {
                new Claim(ClaimTypes.Name, "222"),
                new Claim(ClaimTypes.Role,"admin"),
                new Claim(ClaimTypes.Role,"user")
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Security:Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims:userInfoClaims,
                issuer:_configuration["Security:Tokens:Issuer"],
                audience:_configuration["Security:Tokens:Audience"],
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials:creds
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(tokenString);
        }

    }
```



6. Configure your access control

   |- `[Authorize]` 

   |- 

   |- `[AllowAnonymous]`

   |- 

