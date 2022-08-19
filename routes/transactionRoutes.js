const express = require("express");
const router = express.Router();
// const updateTransaction = require("../controllers/transactions");
const {etherPricePlusBalanceCalculated, createTransaction, updateTransaction} = require("../controllers/transactions");

// db.collection.find('transactions').find()
// router.get("/makeChange/:walletAddress", updateTransaction);


// Task 1
router.get("/:walletAddress", createTransaction);


router.get("/:walletAddress", updateTransaction);

// Task 3
router.get(
  "/etherPricePlusBalanceCalculated/:walletAddress",
  etherPricePlusBalanceCalculated
);
// router.route("/balance").get(async function(req,res){
//     // const dbConnect = dbo.getDb();
//     // axios
//     // .get(
//     //   // `https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=${process.env.API_KEY}`
//     //   `https://api.etherscan.io/api?module=account&action=balance&address=${req.params.walletAddress}&tag=latest&apikey=${process.env.API_KEY}`
//     // )
//     // .then((response) => {
//     //   // const str = CircularJSON.stringify(data);
//     //   // res.send(str)
//     //   res.send(response.data);
//     //   const newDBInstance = new Balance({
//     //     walletAddress: req.params.walletAddress,
//     //     balance: response.data,
//     //   });
//     //   try {
//     //     // const newTransaction = newDBInstance.update({noExist: true});
//     //     newDBInstance.save();
//     //   } catch (err) {
//     //     // res.send({message : err.message})
//     //     // res.status(400).json({ message: err.message });
//     //     console.error(err);
//     //   }
//     // })
//     // .catch((error) => {
//     //   console.error(error);
//     // });
//     res.send("Route Working")
//     // db.collection('transactions').find()
//     // dbConnect.collection("wallet")
//     // .find({}).limit(50)
//     // .torArray(function (err, result){
//     //     if(err){
//     //         res.status(400).send("Error");
//     //     }else{
//     //         res.json(result)
//     //     }
//     // })
// })

// const router = express.Router()

// router.get('/', getClients)
// router.get('/user', getClientsByUser);
// router.post('/', createTransaction)
// router.patch('/:id', updateClient)
// router.delete('/:id', deleteClient)

module.exports = router;
