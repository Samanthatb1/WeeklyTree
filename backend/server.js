const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json())






app.listen(PORT, () => {
  console.log("server running on port ", PORT)
})