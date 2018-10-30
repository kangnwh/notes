# Location and Address



## Prepare

Add all THREE description keys in `plist`

```
NSLocationAlwaysAndWhenInUseUsageDescription
NSLocationAlwaysUsageDescription
NSLocationWhenInUseUsageDescription
```

墨易需要使用您的位置信息来追踪您的健康情况

## Get location (lati & longti)

```swift
class MyViewController: UIViewController {

let locationManager = CLLocationManager() 

func requestPermissionAndStart(){
    if  authorizationStatus == .notDetermined {
        locationManager.requestAlwaysAuthorization()
    }
    
    switch authorizationStatus{
        case .notDetermined:
            locationManager.requestAlwaysAuthorization()
        case .authorizedWhenInUse:
            break
        case .authorizedAlways:
            locationManager.startUpdatingLocation()
        case .restricted:
            break
        case .denied:
             print("denied, ask user to grant permission in settings")
             UIFuncs.popUp(title: "Opps", info: "This app does not have the permission to get your location information, please go to settings=>privacy to grant permission", type: .caution, sender: self, callback: {})
        }
        
        
}
    
extension UploadViewController:CLLocationManagerDelegate{
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
   		// do what you want with updated locations
        guard let locValue: CLLocationCoordinate2D = manager.location?.coordinate else 		   { return }
    	print("locations = \(locValue.latitude) \(locValue.longitude)")
	}
}



```







## Get address name from location(lati & longti)

```swift
func getAddress(lati:CLLocationDegrees, logi:CLLocationDegrees) -> String {
        var address: String = ""

        let geoCoder = CLGeocoder()
        let location = CLLocation(latitude: lati, longitude: logi)
        //selectedLat and selectedLon are double values set by the app in a previous process

        geoCoder.reverseGeocodeLocation(location, completionHandler: { (placemarks, error) -> Void in
                                                                      
		if error != nil {
            println("Reverse geocoder failed with error" + error.localizedDescription)
            return
        }
		if placemarks.count <= 0 {
            println("Problem with the data received from geocoder")
            return 
        }

            // Place details
            var placeMark: CLPlacemark!
            placeMark = placemarks?[0]

            // Address dictionary
            //print(placeMark.addressDictionary ?? "")

            // Location name
            if let locationName = placeMark.name {
                address += locationName
            }
            
            // Street address
            if let street = placeMark.thoroughfare {
                address += street
            }
            
            // City
            if let city = placeMark.locality { // city
                address += city
            }
            
            // Country
            if let country = placeMark.country{
                address += country
            }

        })

        return address;
    }
```

