const mongoose = require("mongoose");
import { MONGODB_URL } from ".././config";

mongoose.connect(MONGODB_URL);
require("./users");
require("./orders");

const mongoDbConnection = mongoose.connection;
mongoDbConnection.on("error", function () {
  console.log(">>>>>>>> Unable to connect to the Mongo Database. >>>>>>>>");
});

mongoDbConnection.once("open", function () {
  console.log(
    ">>>>>>>> Mongo connection has been established successfully. >>>>>>>>"
  );
});

export default mongoDbConnection;
