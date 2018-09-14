# LINQ



Frequently Used LINQ Syntax



### Select and process for every item in result list

```C#
// Query Syntax:
var evenNumQuery =  // var --> 类型推断, 不需要自己指定类型
    from num in numbers
    where (num % 2) == 0 && condition2		// filter, 可省略
    select $"This is the num:{num}";// just like SQLs, 也可以用作讲列表中每个元素进行特定操作

var evenNumQuery =  
    from num in numbers
    where (num % 2) == 0 || condition2		
    select $"This is the num:{num}";
    

//Method Syntax:
var evenNumQuery = numbers.Where(num => num % 2 ==0);
ArrayList stringResutl = ArrayList();
foreach (int i in numbers){
    stringResutl.Add($"This is the num:{i}")
}

// and so on...
numbers.Average();

```



## Using temp variable within LINQ

```c#
var queryNames =
    from student in students
    let i = student.ID.ToString()  // temporary variable {i}
    where ids.Contains(i)
    select new { student.LastName, student.ID };
```





### Orderby and grouping

```c#
// queryCustomersByCity is an IEnumerable<IGrouping<string, Customer>>
  var queryCustomersByCity =
      from cust in customers
      group cust by cust.City;
```



### Join (not frequently used as foreign key helps more)

```c#
var innerJoinQuery =
    from cust in customers
    join dist in distributors on cust.City equals dist.City
    select new { CustomerName = cust.Name, DistributorName = dist.Name };
```

