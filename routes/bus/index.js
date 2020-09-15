const express = require("express");
const route = express.Router();
const DatabaseModels = require("./../../models");
const { reserveBus } = require("./../../models");

route.use((req, res, next) => {
  console.log("bus route called");
  next();
});
/**
 * @swagger
 *
 * /bus:
 *   get:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */

 /**
 * @swagger
 *
 * /search:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */

route.get("/", (req, res) => {
  res.send("bus created");
});

route.post("/add-bus", async (req, res) => {
  console.log("req body :", req.body);
  const { body: { busName, busNumber, source, destination } = {} } = req;
  if (!(busName && busNumber && source && destination)) {
    return res.status(400).send("Please provide all required params");
  }
  try {
    const bus = await DatabaseModels.createBus({
      busName,
      busNumber,
      source,
      destination,
    });
    console.log(bus);
    return res.send("Bus created successfully!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong on our side");
  }
});

route.post("/search", async (req, res) => {
  const {
    body: { source, destination, seatRequired = 1, travelDate } = {},
  } = req; //de structure data from req
  if (!(source && destination && travelDate)) {
    return res.status(400).send("Please provide all required params");
  }
  try {
    const result = await DatabaseModels.searchBus({
      source,
      destination,
      seatRequired,
      travelDate,
    });
    console.log("result ", result);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong on our side");
  }
});

route.post("/reserve", async (req, res) => {
  const {
    body: { busId, seatRequired, userId, travelDate, seatId } = {},
  } = req; //de structure data from req
  if (!(busId && seatRequired && userId && travelDate && seatId)) {
    return res.status(400).send("Please provide all required params");
  }
  try {
    const result = await DatabaseModels.reserveBus({
      busId,
      seatRequired,
      userId,
      travelDate,
      seatId,
    });
    console.log("result ", result);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong on our side");
  }
});

route.get("/view-reserve/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const bookings = await DatabaseModels.viewReserve({ userId });
  res.send(bookings);
});

module.exports = route;
