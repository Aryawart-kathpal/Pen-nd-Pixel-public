require('dotenv').config();
module.exports={
    service:'Gmail',
    auth: {
        user: 'aryawart.kathpal2909@gmail.com',
        pass: process.env.MAIL_PASSWORD,
    }
};