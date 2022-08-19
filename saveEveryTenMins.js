const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");
const ethPriceModel = require("./models/ethPriceModel");

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to this sexy DB.")
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });



setInterval(function () {
  console.log("Ether Price will be updated every 10 seconds.");
  axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    )
    .then((response) => {
      //   const newDBInstance = new etherPriceModel({
      //     timeOfScan: new Date()
      //       .toString()
      //       .replace(/T/, ":")
      //       .replace(/\.\w*/, ""),
      //     priceOfEth: response.data,
      //   });
      const newEthPrice = new ethPriceModel({
        // const data = {
        ethPrice: response.data.ethereum.inr,
        createdAt: new Date().toISOString(),
        // };
      });
      try {
        newEthPrice.save();
        console.log(response.data);
      } catch (err) {
        console.error(error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}, 10000);
