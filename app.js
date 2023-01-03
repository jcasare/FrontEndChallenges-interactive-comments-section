const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const connectDB = require("./db/connect");
require("dotenv").config();
const router = require("./routes/auth");

//middlewares
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("my full crud app");
});
app.post("/api/v1/auth/login", (req, res) => {
  res.send(req.body);
});

const spinServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
spinServer();
