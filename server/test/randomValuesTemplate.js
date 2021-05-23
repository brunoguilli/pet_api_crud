var dateFormat = require('dateformat');
const Str = require('@supercharge/strings');

exports.generateNumber = function (tipo) {
    if(tipo.toUpperCase() === 'CPF'){
        limite = 13;
    } else {
        limite = 0;
    }
    return Math.random().toString().slice(2,limite);
}

exports.generateChar = function (limite) {
    return Str.random(limite).toUpperCase();
}

exports.randomDate = function (start, end) {
    date =  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // toDateString -> Retira data e hora
    date = date.toDateString();
    // dateFormat -> Utiliza o formato desejado
    return dateFormat(date, "yyyy-mm-dd");
}