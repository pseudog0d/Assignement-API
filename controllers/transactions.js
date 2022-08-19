const mongoose = require("mongoose");
require("dotenv").config();
const TransactionModel = require("../models/transactionModel");
const axios = require("axios");


// Task 1
const createTransaction = async (req, res) => {
  axios
    .get(
      // `https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=${process.env.API_KEY}`
      `https://api.etherscan.io/api?module=account&action=txlist&address=${req.params.walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.API_KEY}`
      // `https://api.etherscan.io/api?module=account&action=balance&address=${req.params.walletAddress}&tag=latest&apikey=${process.env.API_KEY}`
    )
    .then((response) => {
      // const str = CircularJSON.stringify(data);
      // res.send(str)
      const newClient = new TransactionModel({
        // const data = {
        _id: req.params.walletAddress,
        walletAddress: req.params.walletAddress,
        transactions: response.data,
        createdAt: new Date().toISOString(),
        // };
      });
      try {
        newClient.save(function (err) {
          if (err) {
            if (err.name === "MongoSeverError" || err.code === 11000) {
              // Duplicate Wallet Address
              console.log("WalletAddress already exist!, use updateTransactionApiRequest.",)
              return res.status(422).send({
                succes: false,
                message:
                  "WalletAddress already exist!, use updateTransactionApiRequest.",
              });
            }
          }
          console.log(response.data) 
          res.send(response.data);
        });

        //   return res.status(422).send(err);
        // }
        // TransactionModel.updateOne(
        //   { _id: data._id },
        //   { $setOnInsert: { ...data } },
        //   { upsert: true }
        // );
        // console.log(
        //   TransactionModel.find({ walletAddress: req.params.walletAddress })
        // );
        // res.status(201).json(newClient);
        // res.send(response.data);
      } catch (error) {
        res.status(409).json(error.message);
      }
    });
  // .catch((error) => {
  //   console.error(error);
  // });
};

const updateTransaction = async (req, res) => {
  axios
    .get(
      // `https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=${process.env.API_KEY}`
      `https://api.etherscan.io/api?module=account&action=balance&address=${req.params.walletAddress}&tag=latest&apikey=${process.env.API_KEY}`
    )
    .then((response) => {
      // const str = CircularJSON.stringify(data);
      // res.send(str)
      // const newClient = new TransactionModel({
      const data = {
        _id: req.params.walletAddress,
        walletAddress: req.params.walletAddress,
        transactions: response.data,
        createdAt: new Date().toISOString(),
      }; //       // });
      try {
        // // newClient.save();
        TransactionModel.updateOne(
          { _id: data._id },
          { $setOnInsert: { ...data } },
          { upsert: true }
        );
        console.log(
          TransactionModel.find({ walletAddress: req.params.walletAddress })
        );
        // res.status(201).json(newClient);
        res.send(response.data);
      } catch (error) {
        res.status(409).json(error.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Task 3
const etherPricePlusBalanceCalculated = async (req, res) => {
  axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    )
    .then((response) => {
      const etherPrice = response.data;
      walletAddress = req.params.walletAddress;
      iniSum = 0;
      console.log(etherPrice);
      TransactionModel.find().exec(function (err, result) {
        // for (var i = 0; i < Object.keys(result).length; i++) {
        //   console.log(result[i].transactions);
        // }
        const transactionResult = result[0].transactions.result;
        console.log(transactionResult.length);
        // console.log(transactionResult)
        for (var i = 0; i < transactionResult.length; i++) {
          // for(key in transactionResult[i]){
          //   if (transactionResult[i][key].indexOf(walletAddress != -1))
          //   foundThis.push(transactionResult[i])

          // }
          // console.log(transactionResult[i]["from"])
          console.log(`Calculated Balance: ${transactionResult[i]["value"]}`);
          if (transactionResult[i]["from"] == walletAddress) {
            iniSum += transactionResult[i]["value"];
            console.log(`Wow ameer ${transactionResult[i]["from"]}`);
          } else {
            iniSum -= transactionResult[i]["value"];
          }
        }

        console.log(iniSum);

        // transactionResult.toArray()
        // console.log(typeof(transactionResult))
      });

      try {
        // // newClient.save();
        // res.status(201).json(newClient);
        res.send(
          `Balance as calculated through previous transactions: ${iniSum}, Ether Price current in INR: ${etherPrice}`
        );
      } catch (error) {
        res.status(409).json(error.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { createTransaction, etherPricePlusBalanceCalculated , updateTransaction};
