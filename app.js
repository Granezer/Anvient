require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const notFound = require("./middleware/notFound");
const error_handler = require("./middleware/error-handler");

//middleware to access the json and form datas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: false}))

//set base route
app.use("/api/v1/", routes);

//middleware to use static files
app.use('/', express.static("./public"));
app.use('/admin', express.static("./admin-public"));
app.use('/admin/uploads', express.static("uploads"));

//middleware to use incorrect routes
app.use(notFound);
//middleware for error handler
app.use(error_handler);

//set port to be used in production and while building
const port = process.env.PORT || 4000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => {
        app.listen(port, () =>
          console.log(`Server is listening on port ${port}`)
        );
      })
      .catch((error) => console.error("Could not connect...", error));
  } catch (error) {
    console.log(error);
  }
};

startApp();
