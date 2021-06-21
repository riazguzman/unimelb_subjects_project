const express = require("express");
const app = express();
const cors = require("cors");

app.listen(5000, () => {
  console.log("connected to server on port 5000");
});
