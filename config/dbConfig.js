const dbConnection = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await dbConnection.connect(process.env.DB_URL).then(() => {
      console.log("Database Connected");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConnect;
