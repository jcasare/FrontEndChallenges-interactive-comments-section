const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const path = require("path");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const xss = require("xss-clean");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const replyRouter = require("./routes/replies");
const reviewRouter = require("./routes/reviews");
const authMiddleware = require("./middleware/auth");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const cookieParser = require("cookie-parser");
const staticRouteMiddleware = require("./middleware/static-route");
const helmet = require("helmet");
const tokenInactivityTime = 1800000;
const maxCookieAge = 2200000;
// middlewares;
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cookieParser({
    expires: tokenInactivityTime,
    maxAge: maxCookieAge,
    httpOnly: true,
    secure: true,
  })
);
app.set("trust-proxy", 1);
app.use(cors());
<<<<<<< HEAD

=======
>>>>>>> bce117f5fe56c6a5041bec137b6457e0f1d536c1
app.use(xss());

app.use(staticRouteMiddleware);
app.use(express.static("./public"));
app.use("/dashboard/review", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.use("/api/v1/auth0", authRouter);

app.use("/dashboard/review/edit", authMiddleware, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "edit.html"));
});

app.use("/dashboard", authMiddleware, (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "main.html"));
});
app.use("/api/v1", reviewRouter, replyRouter);

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
