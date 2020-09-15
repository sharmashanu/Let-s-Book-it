const moment = require("moment");
const getNDays = (n = 7, startDate = "2020-08-17T06:43:23.905") => {
  let day = moment(startDate);
  let days = [];
  for (let i = 0; i < n; i++) {
    days.push(day.toDate());
    day = day.clone().add(1, "d");
  }
  console.log(days);
  return days;
};
const getStartAndEndOfDay = (date) => {
  const d = moment(date);
  const start = d.startOf("day").toDate();
  const end = d.endOf("day").toDate();
  return [start, end];
};

// getNDays();

module.exports = {
  getNDays,
  getStartAndEndOfDay,
};
