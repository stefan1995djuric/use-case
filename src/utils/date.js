import moment from "moment";

export const addDays = (theDate, days) => {
  const date = new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  return date;
};

export const getDayName = (date) => {
  return moment(date).format("dddd");
};

export const getInterval = () => {
  const d = new Date();

  return `${moment(d).format("MMMM")} ${d.getDate()}-${addDays(
    d,
    6
  ).getDate()} ${d.getFullYear()}`;
};

export const getRandTemperatures = () => {
  let temperatures = [];
  for (let i = 0; i < 10; i++) {
    temperatures.push(Math.floor(Math.random() * 81) - 40);
  }
  return temperatures;
};
