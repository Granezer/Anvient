const monthsArr = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

function getDate() {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${monthsArr[month]} ${day}, ${year}`;
}
// date.toString()
// const currentDate = date.toDateString()

// console.log(getDate());
module.exports = getDate();
