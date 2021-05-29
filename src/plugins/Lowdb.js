
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'


const adapter = new LocalStorage(`zw-lowdb-util`)
const db = low(adapter)

db.defaults({
    sys: {},
    dataList: []
}).write()

export default db
