1. add protocol `NSFetchedResultsControllerDelegate `
2.  create lazy variable `NSFetchedResultsController <T>`

```swift
var sectionChanges = [(type: NSFetchedResultsChangeType, sectionIndex: Int)]()
var itemChanges = [(type: NSFetchedResultsChangeType, indexPath: IndexPath?, newIndexPath: IndexPath?)]()
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



3. override 3 funcs

### Whole code example

```swift


extension OrderViewController:NSFetchedResultsControllerDelegate {
    func controller(_ controller: NSFetchedResultsController<NSFetchRequestResult>, didChange sectionInfo: NSFetchedResultsSectionInfo, atSectionIndex sectionIndex: Int, for type: NSFetchedResultsChangeType) {
        self.sectionChanges.append((type, sectionIndex))
    }
    
    func controller(_ controller: NSFetchedResultsController<NSFetchRequestResult>, didChange anObject: Any, at indexPath: IndexPath?, for type: NSFetchedResultsChangeType, newIndexPath: IndexPath?)
    {
        self.itemChanges.append((type, indexPath, newIndexPath))
    }
    
    func controllerDidChangeContent(_ controller: NSFetchedResultsController<NSFetchRequestResult>)
    {
        
        let thisCollectionView = self.billCardCollectionView!
        
        billCardCollectionView.performBatchUpdates({
            
            for change in self.sectionChanges {
                switch change.type {
                case .insert: thisCollectionView.insertSections([change.sectionIndex])
                case .delete: thisCollectionView.deleteSections([change.sectionIndex])
                default: break
                }
            }
            
            for change in self.itemChanges {
                switch change.type {
                case .insert: thisCollectionView.insertItems(at: [change.newIndexPath!])
                case .delete: thisCollectionView.deleteItems(at: [change.indexPath!])
                case .update: thisCollectionView.reloadItems(at: [change.indexPath!])
                case .move:
                    break
                }
            }
            
        }, completion: { finished in
            self.sectionChanges.removeAll()
            self.itemChanges.removeAll()
        })
    }
    
}

```

