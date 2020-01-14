# Cros issues

## Create new policy to allow all requests



under `Startup.cs/ConfigureServices`

```c#
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    }));

    // ...
}
```



## Apply policy global or for particular controllers/actions

Global:

under `Startup.cs/Configure`

```c#
app.UseCors("MyPolicy");
```

