# Change Default Json Converter



1. install package 

```shell
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
dotnet add package Newtonsoft.Json
```

2. update `Startup.cs`

```c#
public void ConfigureServices(IServiceCollection services)
{
  //...
  // json config
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings  
            {
                Formatting = Formatting.None,
                NullValueHandling = NullValueHandling.Ignore
            };

            
            services.AddControllers()
                .AddNewtonsoftJson();
  /...
}
```



