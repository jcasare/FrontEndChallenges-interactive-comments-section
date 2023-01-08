const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const path = require("path");
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const cookieParser = require("cookie-parser");
// middlewares;
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/auth0", authRouter);

app.use("/main", authMiddleware, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "main.html"));
});
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const spinServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

spinServer();
