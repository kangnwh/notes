```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```





```swi
static func mapToMyErrorCode(error:Error) -> MyErrorCode{
        if let ckerror = error as? CKError{
            switch ckerror.code{
                
            // wait and try again later
            case .badContainer,.badDatabase,
                 .batchRequestFailed,
                 .serverResponseLost,
                 .serverRejectedRequest,
                 .serviceUnavailable,
                 .zoneBusy,
                 .requestRateLimited :
                return .waitAndRetry
                
            // network issue
            case .networkFailure, .networkUnavailable:
                return .networkIssue
                
            // permission issue
            case .notAuthenticated, .permissionFailure:
                return .notAuthenticated
                
            // pull and retry
            case .serverRecordChanged:
                return .pullAndRetry
            // unkonw
            case .unknownItem:
                return .deletedItem
            // crash
            case .userDeletedZone, .limitExceeded:
                return .crashError
                
            // ignore
            case .operationCancelled:
                return .ignore
                
                
            default:
                return .unkonwnIssue
            }
        } else {
            return .unkonwnIssue
        }
    }
```

