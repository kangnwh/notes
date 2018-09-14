# How to use camera or photo library of iOS

### 0. Set privacy 

1. open `Info.plist`  and add new rules (photo library as an example)

![image-20180803215113155](/var/folders/kp/72xr2wjs14750f_r6h0qjypc0000gn/T/abnerworks.Typora/image-20180803215113155.png)

2. 





### 1. extension class with UIImagePickerControllerDelegate

```swift
extension MyClass: UIImagePickerControllerDelegate{
     func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
         // 
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        if let image = info[UIImagePickerControllerOriginalImage] as? UIImage {
            self.imagePickedBlock?(image)
        }else{
            print("Something went wrong")
        }
        self.dismiss(animated: true, completion: nil)
    }
}
```

### 2. provide below functions for selecting photo or use camera





```swift
func camera()
    {
        if UIImagePickerController.isSourceTypeAvailable(.camera){
            let myPickerController = UIImagePickerController()
            myPickerController.delegate = self;
            myPickerController.sourceType = .camera
            currentVC.present(myPickerController, animated: true, completion: nil)
        }
        
    }
```





```swift
func photoLibrary()
    {
        
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary){
            let myPickerController = UIImagePickerController()
            myPickerController.delegate = self;
            myPickerController.sourceType = .photoLibrary
            currentVC.present(myPickerController, animated: true, completion: nil)
        }
    }
```

## A function to show options to user

```swift
func showActionSheet(vc: UIViewController) {
        currentVC = vc
        let actionSheet = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        actionSheet.addAction(UIAlertAction(title: "Camera", style: .default, handler: { (alert:UIAlertAction!) -> Void in
            self.camera()
        }))
        
        actionSheet.addAction(UIAlertAction(title: "Gallery", style: .default, handler: { (alert:UIAlertAction!) -> Void in
            self.photoLibrary()
        }))
        
        actionSheet.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))
        
        vc.present(actionSheet, animated: true, completion: nil)
    }
```

