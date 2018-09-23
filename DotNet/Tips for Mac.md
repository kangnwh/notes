# Tips for Mac

###Print log into console

```c#
System.Diagnostics.Debug.WriteLine("SomeText");
//or 
using System.Diagnostics;
Debug.WriteLine("SomeText");
```



### Make project complie on the fly

1. add below lines into `*.csproj`

```c#
 <ItemGroup>
    <DotNetCliToolReference Include="Microsoft.DotNet.Watcher.Tools" Version="2.0.2" />
  </ItemGroup>
```

2. run

```shell
dotnet restore
```



2. start project by running

```shell
dotnet watch run
```



## aspnet-codegenerator

1. install code generator

```shell
dotnet tool install -g dotnet-aspnet-codegenerator
```

2. add below lines into *.csproj

```xml
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Tools
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```



####Use `Congituration` in your class

In your class, use `DI` to inject `IConfiguration`

```c#
private IConfiguration _configuration;
 
public HomeController(IConfiguration Configuration)
{
      _configuration = Configuration;
}
public void useConfig()
{
    _configuration["MySection:MyFirstConfig"];
}
```

