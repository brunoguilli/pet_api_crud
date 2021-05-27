


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

if (isNumber('124') === true) {
    console.log('verdadeiro');
} else {
    console.log('falso');
};
// console.log(isNumber('124a'));