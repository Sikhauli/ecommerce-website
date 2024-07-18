const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

// import routes
const authRoute = require("./routes/auths");
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart.ts")

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const clientWebsite = process.env.CLIENT_WEBSITE || "http://localhost:5173";
const adminWebsite = process.env.ADMIN_WEBSITE || "http://localhost:5173";
const testWebsite = "http://localhost:4173";

//connect to DB
//listen after db connection has been est
mongoose
  .connect(process.env.DB_CONNECT)
  .then((results) => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/uploads", express.static("./src/uploads")); //for accessing images
app.use(
  cors({
    origin: [clientWebsite, adminWebsite, testWebsite],
    credentials: true,
  })
);

// route middlewares
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

//this middleware should be after all other middlewares ALWAYS!!!
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    console.log(error?.message);
    switch (error.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).send("File size is too large.");
      case "LIMIT_FILE_COUNT":
        return res.status(400).send("File limit reached.");
      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).send("Invalid file format.");
      default: {
        return res.status(400).send("internal error occured!");
      }
    }
  }

  console.error("general error caughting: ", error);
  return res.status(400).send(error.message);
});

app.get("/", (req, res) => {
  res.send("<h3>Oops!!! You took a wrong turn...</h3>");
});
