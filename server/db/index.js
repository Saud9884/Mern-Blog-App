const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://saudLohar:saudLohar9884@cluster0.bnympji.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));
