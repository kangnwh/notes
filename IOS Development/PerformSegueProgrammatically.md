







```swift
// table row selected
func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "billDetail", sender: tableView.cellForRow(at: indexPath))
    }

// prepare before showing
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "billDetail",
            let cell = sender as? StatisticsBillingCell,
            let dest = segue.destination as? HistoryBillDetailViewController{
            dest.setBill(bill: cell.bill)
        }
    }
```

