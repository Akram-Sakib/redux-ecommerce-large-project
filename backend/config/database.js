const mongoose = require("mongoose");

const databaseConnected = () => {
  mongoose
    .connect(`${process.env.DB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database has been connected");
    })
   
};

module.exports = databaseConnected;
