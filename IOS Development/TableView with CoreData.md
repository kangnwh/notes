1. add protocol `NSFetchedResultsControllerDelegate `
2.  create lazy variable `NSFetchedResultsController <T>`

```swift
fileprivate lazy var ongoingFetchController: NSFetchedResultsController<CD_Bill> = {
        // Create Fetch Request
        let fetchRequest: NSFetchRequest<CD_Bill> = CD_Bill.fetchRequest()
        
        // predict
        let predict = NSPredicate(format: "%K = YES", Bill.META_DATA.PAID)
        fetchRequest.predicate = predict
        
        // Configure Fetch Request
        fetchRequest.sortDescriptors = [NSSortDescriptor(key: Bill.META_DATA.START_TIME, ascending: true)]
        
        // Create Fetched Results Controller
        let fetchedResultsController = NSFetchedResultsController(
            fetchRequest: fetchRequest,
            managedObjectContext: CoreDataAPI.shared.context,
            sectionNameKeyPath: nil,
            cacheName: nil)
        
        // Configure Fetched Results Controller
        fetchedResultsController.delegate = self
        
        return fetchedResultsController
    }()
```



1. override 3 funcs

### Whole code example

```swift
extension BillOptionSelectionViewController:NSFetchedResultsControllerDelegate{
    func controllerWillChangeContent(_ controller: NSFetchedResultsController<NSFetchRequestResult>) {
        billOptionTableView.beginUpdates()
    }
    
    func controllerDidChangeContent(_ controller: NSFetchedResultsController<NSFetchRequestResult>) {
        billOptionTableView.endUpdates()
    }
    
    func controller(_ controller: NSFetchedResultsController<NSFetchRequestResult>,
                    didChange anObject: Any,
                    at indexPath: IndexPath?,
                    for type: NSFetchedResultsChangeType,
                    newIndexPath: IndexPath?) {
        
        let thisTableView = billOptionTableView!
        
        switch type {
        case .insert:
            // Note that for Insert, we insert a row at the __newIndexPath__
            if let insertIndexPath = newIndexPath {
                thisTableView.insertRows(at: [insertIndexPath], with: UITableViewRowAnimation.fade)
            }
        case .delete:
            // Note that for Delete, we delete the row at __indexPath__
            if let deleteIndexPath = indexPath {
                thisTableView.deleteRows(at: [deleteIndexPath], with: UITableViewRowAnimation.fade)
            }
        case .update:
            if let updateIndexPath = indexPath {
                //                    // Note that for Update, we update the row at __indexPath__
                //                    let cell = thisTableView.cellForRow(at: updateIndexPath) as? OngoingBillingCell
                //                    let bill = self.ongoingFetchController.object(at: updateIndexPath)
                //                    cell?.cellInfo = Bill(cdItem: bill)
                
            }
        case .move:
            break
        }
        
    }
}

```

