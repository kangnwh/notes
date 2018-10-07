# Entity Frame Usage

### Database driver package

1. SQLite

```shell
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

​	

2. MySQL

```shell
dotnet add package MySql.Data.EntityFrameworkCore
dotnet add package MySql.Data
```

#### DB Context connection string configuration

1. Add your connection string in file `appsettings.json`

```json
ConnectionStrings:{
     "${ConnectionName}": "server=${server_ip};port=3306;database=${db_name};uid=${user};password=${password}"
}
```
 

## [Database First]

#####Create Db context class under `Models` folder

```c#
public class MobileDbContext : DbContext
    {
        public MobileDbContext(DbContextOptions<MobileDbContext> options)
            : base(options)
        {

        }

    }
```

##### Generate entity classes from exisiting database

```
dotnet ef dbcontext -h
dotnet ef dbcontext scaffold -h
dotnet ef dbcontext scaffold -d -c 

dotnet ef dbcontext scaffold -o Model "server=123.56.22.40;port=3306;database=sns;uid=sns;password=${your_pwd}" "Pomelo.EntityFrameworkCore.MySql"  --prefix-output
```

**NOTE**: 

> Could not scaffold the foreign key 'Image(postId)'. A key for 'id' was not found in the principal entity type 'Post'.

This is because the `id` column(key) in table `post` is not set as `unique`.

##### Add Db context in your service configuration method in file `Startup.cs`

```c#
// If you use mysql
using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;


public void ConfigureServices(IServiceCollection services)
{
    //...other configuration
    services.AddCors();

    services.AddDbContext<MobileDbContext>(options =>
        options.UseMySQL(Configuration.GetConnectionString("${ConnectionName}")));
	
    //...other configuration
    services.AddMvc();
}
```





#### [Code First]Add entity classes in your `DbContext` class

Tips: [reference](https://docs.microsoft.com/en-us/ef/ef6/modeling/code-first/data-annotations)

|- 自增: `[DatabaseGenerated(DatabaseGeneratedOption.Identity)]`

|- 自定义类型: `[Column(TypeName = "varchar(10)")]`

|- 外键:`[ForeignKey("otherTable")]`

[All annotations](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.stringlengthattribute?redirectedfrom=MSDN&view=netframework-4.7.2)

```c#
public class MobileDbContext : DbContext
    {
        public MobileDbContext(DbContextOptions<MobileDbContext> options)
            : base(options)
        {
        }


        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        public class User
        {
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int id { set; get; }
            [Column(TypeName = "varchar(10)")]
            public string username { set; get; }
            public string password { set; get; }
            [Column(TypeName = "varchar(10)")]
            public string name { set; get; }
            [Column(TypeName = "varchar(30)")]
            public string email { set; get; }
            [Column(TypeName = "varchar(10)")]
            public string phone { set; get; }
            [Column(TypeName = "date")]
            public DateTime dob { get; set; }
            [Column(TypeName = "char(1)")]
            public string gender { set; get; }
            [Column(TypeName = "date")]
            public DateTime createDate { set; get; }

        }

        public class Role
        {
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int id { set; get; }


            [Column(TypeName = "varchar(10)")]
            public string roleName { set; get; }


            [Column(TypeName = "date")]
            public DateTime createDate { set; get; }
        }
    }
```

#### Migrate your model

```shell
#in case you did not add this package
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet resotre

dotnet ef migrations add InitialCreate
dotnet ef database update
```

