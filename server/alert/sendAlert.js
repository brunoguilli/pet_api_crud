const axios = require('axios');

exports.sendSms = async function (message) {
    const sms = await axios ({
        url: 'https://api2.totalvoice.com.br/sms',
        method: 'post',
        headers: {
            'Access-Token': process.env.SMSZENVIATOKEN
        },
        data: {
            'numero_destino': process.env.PHONENUMBER,
            'mensagem': 'Alerta Pet API -> '+message
        }
    })
    console.log(sms.data);
} ;
