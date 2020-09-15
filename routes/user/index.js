const express = require("express");
const route = express.Router();
const DatabaseModels = require("./../../models");

route.post("/add-user", async (req, res) => {
  console.log("req body :", req.body);
  const { body: { name, email, password } = {} } = req;
  if (!(name && email && password)) {
    return res.status(400).send("Please provide all required params");
  }
  try {
    const user = await DatabaseModels.createUser({
      name,
      email,
      password,
    });

    return res.send("user created successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong on our side");
  }
});

module.exports = route;
