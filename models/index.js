const Sequelize = require("sequelize");
const BusModel = require("./bus");
const UserModel = require("./user");
const SeatModel = require("./seats");
const BookingModel = require("./booking");
const Utils = require("../utils");

const dbConnection = new Sequelize("practice", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

const Bus = BusModel(dbConnection, Sequelize);
const Seat = SeatModel(dbConnection, Sequelize);
const Booking = BookingModel(dbConnection, Sequelize);
Bus.hasMany(Seat, { foreignKey: "busId" });
Seat.belongsTo(Bus, { foreignKey: "busId" });
const User = UserModel(dbConnection, Sequelize);
const createBus = (data) => {
  const {
    busName,
    source,
    destination,
    busNumber,
    total = 30,
    available = 30,
  } = data;
  return Bus.create({
    busName,
    busNumber,
    source,
    destination,
  }).then(({ id }) => {
    console.log(`bus id is ${id}`);
    return createSeats({ total, available, busId: id });
  });
};

const createUser = (data) => {
  const { name, email, password } = data;
  return User.create({
    name,
    email,
    password,
  });
};
const createSeats = (data, forNextNDays = 7) => {
  const dates = Utils.getNDays(7);
  const bulkSeatsRecords = dates.map((d) => ({ ...data, date: d }));
  return Seat.bulkCreate(bulkSeatsRecords);
};

const searchBus = async (data) => {
  const { source, destination, seatRequired, travelDate } = data;
  const [start, end] = Utils.getStartAndEndOfDay(travelDate);
  const searchResult = await Bus.findAll({
    where: { source: source, destination: destination },
    include: {
      model: Seat,
      where: {
        available: {
          [Sequelize.Op.gte]: seatRequired,
        },
        date: {
          [Sequelize.Op.gte]: start,
          [Sequelize.Op.lte]: end,
        },
      },
    },
  });
  return searchResult;
};
// dbConnection.sync({ force: true });
const reserveBus = async (data) => {
  const { busId, seatRequired, userId, travelDate, seatId } = data;
  const userDetails = await User.findOne({
    where: { id: userId },
  });
  if (!userDetails) {
    throw Error("user doesnot exist");
  }
  const searchResult = await Seat.findOne({
    where: {
      available: { [Sequelize.Op.gte]: seatRequired },
      busId,
      id: seatId,
    },
  });
  const result = await Seat.update(
    { available: searchResult.available - seatRequired },
    {
      where: {
        available: { [Sequelize.Op.gte]: seatRequired },
        busId,
        id: seatId,
      },
    }
  );

  const bookingResult = await Booking.create({
    userId,
    busId,
    date: travelDate,
    seatsBooked: seatRequired,
  });

  return {
    bookingId: bookingResult.id,
    travelDate,
    seatsBooked: seatRequired,
    userName: userDetails.name,
  };
};
const viewReserve = (data) => {
  const { userId } = data;
  return Booking.findAll({
    where: { userId },
  });
};

module.exports = {
  createBus,
  searchBus,
  reserveBus,
  viewReserve,
  createUser,
  db: dbConnection,
};
