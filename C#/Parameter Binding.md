# Parameter Binding



## Model Binding

[Excellent Doc!!](http://www.tutorialsteacher.com/mvc/model-binding-in-asp.net-mvc)

Example: Only bind value to field `StudentId` and `StudentName`:

```c#
[HttpPost]
public ActionResult Edit([Bind(Include = "StudentId, StudentName")] Student std)
{
    var name = std.StudentName;
           
    //write code to update student 
            
    return RedirectToAction("Index");
}
```





## .Net Core Spec

#### [FromUri]

Example:

```c#
public ValuesController : ApiController
{
    public HttpResponseMessage Get([FromUri] string name,[FromUri] int age) { ... }
}
```

We can get `name` and `age` from below url:

```http
http://localhost/api/values/?name=abc&age=12
```



#### [FromBody]

Example:

```c#
public ValuesController : ApiController
{	
    public HttpResponseMessage Post([FromBody] string name) { ... }
}
```

Used when user send request via `form`:

```html
<form action="/Values/Post">
    <input type="text" name="name" value="abc"/>
    <input type = "submit"/>
</form>
```

We will get `name=abc` after user submitting this form.





