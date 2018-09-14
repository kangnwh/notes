reference : [link](https://nshipster.com/uiprintinteractioncontroller/)

## 1. select printer before print

```swift
private func printerTest(){
        let c = UIPrintInteractionController.shared
        
        let printInfo = UIPrintInfo(dictionary: nil)
        
        printInfo.jobName = "test"
        printInfo.outputType = .grayscale
        
        c.printInfo = printInfo
        
        c.printingItem =  #imageLiteral(resourceName: "tableSpare")
        
        c.present(animated: true, completionHandler: nil) // show print configuration
        //c.print(to: , completionHandler:) // print directly to a printer
        
        
    }
```



## 2. print directly

#### 1. configure printer first ( store the URL of connected printer)

```swift
 private func selectPrinter(){
        var printerPicker = UIPrinterPickerController(initiallySelectedPrinter: nil)
        printerPicker.present(from: CGRect(x: 0, y: 0, width: 100, height: 100), in: self.view, animated: true) { (controller, isSelected, error) in
            print(controller.selectedPrinter!.url) // save this printer somewhere
        }
       
    }
```

#### 2. print directly

```swift
private func printerTest(){
        let c = UIPrintInteractionController.shared
        
        let printInfo = UIPrintInfo(dictionary: nil)
        
        printInfo.jobName = "test"
        printInfo.outputType = .grayscale
        
        c.printInfo = printInfo
    
        let formatter = UIMarkupTextPrintFormatter(markupText: "<h1>test</h1> <ul><li>1</li></ul>")
        formatter.perPageContentInsets = UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10) // 1" margins
        c.printFormatter = formatter
        
        let printer = UIPrinter(url: URL(string: "ipps://Kangs-MacBook-Pro.local.:8632/ipp/print/label")!)
        
        DispatchQueue.global(qos: .background).async { // put this task in background
             c.print(to: printer, completionHandler: nil)
        }
        
    }
```

