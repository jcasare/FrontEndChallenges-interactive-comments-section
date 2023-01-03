const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
//middlewares
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("my full crud app");
});
app.post("/api/v1/auth/login", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
