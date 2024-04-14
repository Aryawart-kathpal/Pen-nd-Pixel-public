require('dotenv').config();
module.exports={
    service:'Gmail',
    auth: {
        user: 'uncannydevs@gmail.com',
        pass: process.env.MAIL_PASSWORD,
    }
};