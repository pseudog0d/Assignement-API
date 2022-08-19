var monogUtil = require("./mongoUtilSharedConn")

var db = monogUtil.getDb();

console.log(db.collection('transactions').find())