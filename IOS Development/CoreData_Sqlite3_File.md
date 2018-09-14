```swift
let urls = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
print(urls[urls.count-1] as URL)
```

