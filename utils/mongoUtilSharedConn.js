require("dotenv").config()
// const mongoose = require("mongoose")
// const MongoClient = mongoose.MongoClient;
const MongoClient = require( 'mongodb' ).MongoClient;
const url = process.env.DB_URL;

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('transactions');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};


