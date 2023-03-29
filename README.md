# azizdb
local json-based database for small datas

```
import JDB from "./db/mydb"

// Insert many items
JDB.token.insert([{ address: "0x1", name: "Btc", decimals: 18 }])

// find one from DB
JDB.token.findOne("0x")
```
