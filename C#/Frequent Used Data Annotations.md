# Frequently Used Data Annotations

[Full Doc](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.stringlengthattribute?redirectedfrom=MSDN&view=netframework-4.7.2)

## View used annotations

| Annotations                                                  | Introduction / Demos                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [DataType(DataType.${your_type_here})]                       | Example:<br />[DataType(DataType.Date)]<br /><br />Indicate that this is a `date` column, so that show this as the `date format` when render view.    <br />[All data types](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.datatype?view=netframework-4.7.2) |
| [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)] | Customise the display format when render views.              |



## Validation Annotations

| Annotations                                  | Introduction / Demos |
| -------------------------------------------- | -------------------- |
| [Required]                                   |                      |
| [StringLength(60, MinimumLength = 3)]        |                      |
| [RegularExpression(@"^[A-Z]+[a-zA-Z'\s]*$")] |                      |
| [Range(1, 100)]                              |                      |

