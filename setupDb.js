const DataBaseModels = require("./models");

const users = ["bob", "martin", "peter", "john"];

const bus = [
  {
    source: "delhi",
    destination: "mumbai",
  },
  {
    source: "delhi",
    destination: "gurgaon",
  },
  {
    source: "noida",
    destination: "agra",
  },
  {
    source: "noida",
    destination: "delhi",
  },
  {
    source: "agara",
    destination: "noida",
  },
  {
    source: "delhi",
    destination: "bhopal",
  },
];
const setup = async () => {
  // setup users
  console.log("setting up tables");
  await DataBaseModels.db.sync({ force: true });
  console.log("inserting data");
  await Promise.all(
    users
      .map((user) => {
        return {
          name: user,
          email: `${user}@examplemail.com`,
          password: `${user}_very_secret_password`,
        };
      })
      .map((user) => {
        return DataBaseModels.createUser(user);
      })
  );
  await Promise.all(
    bus
      .map((b, index) => {
        return {
          ...b,
          busName: `bus_${index}`,
          busNumber: `MP-45-22${index}`,
        };
      })
      .map((b) => DataBaseModels.createBus(b))
  );
};
setup();
