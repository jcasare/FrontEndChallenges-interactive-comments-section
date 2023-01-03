const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
app.get("/", (req, res) => {
  res.send("my full crud app");
});
app.post("/api/v1/auth0/sign-in", (req, res) => {
  res.send("thanks");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
