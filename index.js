const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname, "./build")));
app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
