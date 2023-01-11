const AWS = require('aws-sdk');
const Responses = require('./common/API_Responses');

const SES = new AWS.SES();

exports.handler = async event => {

    const message = `Hola, 
        Estudia Serverless todos los dias`;

    const params = {
        Destination: {
            ToAddresses: ['direccion@email.com'],
        },
        Message: {
            Body: {
                Text: { Data: message },
            },
            Subject: { Data: 'Email de Prueba' },
        },
        Source: 'direccion@email.com',
    };

    try {
        await SES.sendEmail(params).promise();
        return Responses._200({ message: 'email sent' });
    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: 'failed to send the email' });
    }
};