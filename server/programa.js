
var dateFormat = require('dateformat');

function randomDate(start, end) {
    date =  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    date = date.toDateString();
    return dateFormat(date, "yyyy-mm-dd h:MM:ss");
}

console.log("teste");
console.log(randomDate( new Date(1990, 0, 1), new Date()) );
console.log(dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"));

