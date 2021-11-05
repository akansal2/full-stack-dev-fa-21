const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const user = require("./user");
const shop = require("./shop");


// PORT
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.post("/user/signup", user.signUpUser);

app.post("/user/login", user.loginUser);

app.get("/shop/list", shop.getList);

app.post("/shop/add", shop.addItem);

app.delete("/shop/delete", shop.deleteItem);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

