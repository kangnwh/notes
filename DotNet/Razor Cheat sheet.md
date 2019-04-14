# Razor Cheat sheet

### Basic 

`Razor` is used to combine c# code and html/css/js code together and finally generated a pure html file before send back to user's browser.

Key syntax [doc](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-2.1):

1. Use a `@` before any `c#` code/block
2. **Partial Page/Component**
3. [DisplayTemplate/EditorTemplate](https://exceptionnotfound.net/asp-net-mvc-demystified-display-and-editor-templates/)
4. HTML helper:

| Functionalities                 | Example                                                      |
| ------------------------------- | ------------------------------------------------------------ |
| Add link to other pages/actions | `@Html.ActionLink("${title}", "${Action}", "${Controller}")` |
| Generate Form                   | `@using(Html.BeginForm("${Action}", "${Controller}", FormMethod.Post)){}` |
| DisplayTemplates*               | `@Html.DisplayNameFor(model => model.content)`               |
| EditorTemplate*                 | `@Html.LabelFor(m => m.content, htmlAttributes: new { @class = "control-label col-md-2" })` |
| Hidden                          | `@Html.HiddenFor(m => m.DoctorId)`                           |

##### 

### DisplayTemplate

1. Scaffold `FeedbacksController` just like `DoctorsController`
2. Try the scaffold system and it is not what we want, as we want to "see" feedbacks under the description of doctors and provide(create) new feedback there too (under the `details` page of Doctor)
3. Route `Doctors\details\{id}` is conducted by `DoctorsController.Details` and the view is `Doctors/Details.cshtml`, so we need to update these 2 files

- For the view: `Doctors/Details.cshtml`, append all feedbacks that belong to this doctor:

- As we want to simplify this step and reuse the format of feedback model, we can create a `DisplayTemplates`for model `Feedback`

  - Create a folder named `DisplayTemplates` (folder name must be this one) under `Views/Shared`
  - Create a file named `Feedback.cshtml` (file name must be the same as model name)and format the layout of feedback model as you want

  ```html
  @model W3Demo03.Models.Feedback
  
  <div class="panel panel-primary">
      <div class="panel-heading">@Html.DisplayFor(model => model.userId)</div>
      <div class="panel-body">
          @Html.DisplayFor(model => model.content)
      </div>
  </div>
  ```

  - So that we can use this template anywhere we want to display Feedback model, like this time, in `Details.cshtml`

  ```html
  @foreach (var item in Model.Feedbacks)
  {
      @Html.DisplayFor(m => item)
  
  }
  ```



### Partial

Now we can see feedbacks for every doctor, how can we submit our own feedback?

This time we use `Partial` feature of Razor.

- Create a folder under `Views/Shared`
- Create a file named `_Feedback.cshtml` (any name you want)
- Add the creation layout of model `Feedback` as you wish

```html
@model W3Demo03.Models.Feedback

<h2>Add feedback</h2>


@using (Html.BeginForm("Create", "Feedbacks", FormMethod.Post))
{
    @Html.AntiForgeryToken()


<div class="form-horizontal">
    <h4>Feedback</h4>
    <hr />
    @Html.ValidationSummary(true, "", new { @class = "text-danger" })
    <div class="form-group">
        @Html.LabelFor(m => m.content, htmlAttributes: new { @class = "control-label col-md-2" })
        <div class="col-md-10">
            @Html.EditorFor(m => m.content, new { htmlAttributes = new { @class = "form-control" } })
            @Html.ValidationMessageFor(m => m.content, "", new { @class = "text-danger" })
        </div>
    </div>

    @Html.HiddenFor(m => m.DoctorId)

    <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
            <input type="submit" value="Create" class="btn btn-default" />
        </div>
    </div>
</div>
}    
```

- Use this Partial anywhere you want to place a form to create or update feedback, with a parameter (Feedback feedback) just like you call functions. In `Details.cshtml` of Doctors:

```html
@{ Feedback editFeedback = new Feedback { DoctorId = Model.Id}; }
    @Html.Partial("Partial/_Feedback", editFeedback)
```

> As you can see, we firstly create an instance of Feedback and set its doctorId = doctorId_of_current_page, and then pass it to our Partial page for future rendering.





