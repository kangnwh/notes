## 1. sync data with local

1. archive data before saving locally

```swift
 func archiveRecordID(cdrecord:CKRecord) -> NSMutableData{
        
        // archive CKRecord to NSData
        let archivedData = NSMutableData()
        let archiver = NSKeyedArchiver(forWritingWith: archivedData)
        archiver.requiresSecureCoding = true
        cdrecord.encodeSystemFields(with: archiver)
        archiver.finishEncoding()
        return archivedData
    }
```

2. unarchive data to generate `CKRecord` before saving from local to CloudKit

```swift
   func unarchiveRecordID(data:Data) -> CKRecord{
        let archivedData = data // TODO: retrieved from your local store
        
        // unarchive CKRecord from NSData
        let unarchiver = NSKeyedUnarchiver(forReadingWith: archivedData)
        unarchiver.requiresSecureCoding = true
        return CKRecord(coder: unarchiver)!
    }


```

### whole example code

```swift
		var cdItem:NSManagedObject?
        
        let ckFlag = BillData.shared.archiveRecordID(cdrecord: self.record)
        
        if let exist = CoreDataAPI.shared.cdFetchWithRecordName(entity: META_DATA.CD_ENTIFY, recordName: self.record.recordID.recordName){
            cdItem = exist
            cdItem?.setValue(ckFlag, forKey: META_DATA.CK_FLAG)
        }else{
             let nsEntity = NSEntityDescription.entity(forEntityName: META_DATA.CD_ENTIFY, in: CoreDataAPI.shared.context)
            cdItem = NSManagedObject(entity: nsEntity!, insertInto: CoreDataAPI.shared.context)
            cdItem?.setValue(ckFlag, forKey: META_DATA.CK_FLAG)
            cdItem?.setValue(self.recordID.recordName, forKey: META_DATA.RECORD_NAME)
        }
        
        guard let item = cdItem else{
            Log.error(info: "Create core data for Bill failed")
            return
        }
        
        item.setValue(self.tableInfo?.toJsonString(), forKey: META_DATA.TABLE_INFO)
```

