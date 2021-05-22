const crypto = require('crypto');
const biguintFormat = require('biguint-format');
const Str = require('@supercharge/strings')

function random(qty) {
    return crypto.randomBytes(qty).toString()
}
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

console.log("teste");
console.log(randomDate(new Date(1990, 0, 1), new Date()));

