# Special SQLs

## Add unique constraint also allow nulls

```sql
CREATE UNIQUE NONCLUSTERED INDEX idx_yourcolumn_notnull
ON YourTable(yourcolumn)
WHERE yourcolumn IS NOT NULL;
```

