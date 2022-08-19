require("dotenv").config();
const mongoose = require("mongoose");
const transactionRouter = require("./routes/transactionRoutes");
const express = require("express");
// const transactionModel = require("./models/transactionModel");

const app = express();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

// const db = mongoose.connection;

// db.on("open", () => {console.log("Connected!")})

app.use("/", transactionRouter);

// transactionModel.find().forEach(function (x) {
// //   x.array.forEach(function (y) {
// //     console.log(y);
// //   });
// console.log(x)
// });
// console.log(typeof(transactionModel.find({})))
// const object1 = {
//     a: 'somestring',
//     b: 42
//   };

//   for (const [key, value] of Object.entries(transactionModel.find())) {
//     console.log(`${key}: ${value}`);
//   }

// console.log(transactionModel.find({}).toArray(function(err,result){
//     if (err) throw err;
//     console.log(result)
// }))
// var MongoClient = require('mongodb').MongoClient;
// var url = process.env.DB_URL

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("transactions");
//   dbo.collection("transactionmodels").find().toArray(function(err, result) {
//     if (err) throw err;
//     // console.log(result[0].transactions);
//         // console.log(typeof(result[0].transactions).toArray)
//     for(var i= 0; i < Object.keys(result).length; i++){
//         console.log(result[i].transactions);
//     }
//     db.close();
//   });
// });
// walletAddress = "0xce94e5621a5f7068253c42558c147480f38b5e0d";
// iniSum = 0;
// transactionModel
//   .find()
//   .where("_id", "0xce94e5621a5f7068253c42558c147480f38b5e0d")
//   .exec(function (err, result) {
//     // for (var i = 0; i < Object.keys(result).length; i++) {
//     //   console.log(result[i].transactions);
//     // }
//     const transactionResult = result[0].transactions.result;
//     console.log(transactionResult.length);
//     // console.log(transactionResult)
//     for (var i = 0; i < transactionResult.length; i++) {
//       // for(key in transactionResult[i]){
//       //   if (transactionResult[i][key].indexOf(walletAddress != -1))
//       //   foundThis.push(transactionResult[i])

//       // }
//       if (transactionResult[i]["from"] == walletAddress) {
//         iniSum += transactionResult[i]["value"];
//       } else {
//         iniSum -= transactionResult[i]["value"];
//       }
//     }

//     console.log(iniSum);

//     // transactionResult.toArray()
//     // console.log(typeof(transactionResult))

// console.log(transactionModel.find())
