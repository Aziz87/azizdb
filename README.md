# azizdb
local json-based database for small datas


---Setting db---
```
import Token from "../interfaces/token.model";
import Pair from "../interfaces/pair.model";
import { JDB } from "../../src/jdb";

export default {
    token: new JDB("token", "address", Token),
    pairs: new JDB("pair", "address", Pair)
}
```


---Use db---
```
import JDB from "./db/mydb"

// Insert many items
JDB.token.insert([{ address: "0x1", name: "Btc", decimals: 18 }])

// find one from DB
JDB.token.findOne("0x")
```
