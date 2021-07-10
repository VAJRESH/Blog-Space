const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// app
const app = express();

// database connection
const uri = process.env.MONGO_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection successful");
});

// middle wares and parsers
if (process.env.NODE_ENV === "development") {
  // cors package for preventing CORS errors in development
  app.use(cors());
}
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes middle wares
// register, login and logout
const authRoutes = require("./routes/auth.route");
app.use("/auth", authRoutes);

// tag related crud operations
const tagRoutes = require("./routes/tag.route");
app.use("/tag", tagRoutes);

// blog post related crud operations
const blogRoutes = require("./routes/blog.route");
app.use("/blog", blogRoutes);

// TODO:user route

// activating server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
