# ImageView



# Load from remote resource extension

##  [Kingfisher](https://github.com/onevcat/Kingfisher) - Download and cached

Install :

```swift
pod 'Kingfisher', '~> 4.0' 
```



Usage:

```swift
import Kingfisher

let url = URL(string: "url_of_your_image")
// this downloads the image asynchronously if it's not cached yet
imageView.kf.setImage(with: url) 
```







