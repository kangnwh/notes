```swift
if let formView = _formInstance, let holderView =  self.view.viewWithTag(1){
            formView.view.frame = CGRect(x: CGFloat(0), y: CGFloat(0), width: holderView.frame.width, height: holderView.frame.height)
            addChildViewController(formView)
            holderView.addSubview(formView.view)
            formView.didMove(toParentViewController: self)
}
```

