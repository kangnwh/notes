# Azure

## Upload files to Storage Account

1. Add package

```bash
dotnet add package Microsoft.Azure.Storage.Blob
```



2. Add configuration in `appsettings.json`

```json
"AzureStorage": {
    "AccessKey": "AccessKey_from_Azure",
    "BaseUrl": "Containers_base_url",
    "Container": "Container_name"
  },
```



3. Add class in `ConfigurationHelper.cs` (see [JWT Authorization](./JWT Authorization.md))

```c#
public class AzureStorage
    {
        public string AccessKey  { set; get; }
        public string BaseUrl  { set; get; }
        public string Container  { set; get; }
    }
```





4. Configurate

```c#

```





```c#
private bool UploadToStorage(string filename, Stream stream)
        {
            CloudStorageAccount storageAccount;
            if (CloudStorageAccount.TryParse(ConfigurationHelper.Current.Storage.AccessKey, out storageAccount))
            {
                // Create the CloudBlobClient that represents the Blob storage endpoint for the storage account.
                var cloudBlobClient = storageAccount.CreateCloudBlobClient();
                
                // Create a container called 'quickstartblobs' and append a GUID value to it to make the name unique. 
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(ConfigurationHelper.Current.Storage.Container);

                CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(filename);
                cloudBlockBlob.UploadFromStream(stream);

                return true;
            }

            return false;
        }
```

