

require('dotenv').config({ path: '.dev.env' });

const Models = require("../db/main");

const request = require('request');

var url = process.env.SMS_API_URI;

const sms_driver = process.env.SMS_DEFAULT_DRIVER;

const {  validateFields  } = require("./field-validator");


const twilioSmsApi = async () => {}

const t2geeksSmsApi = async (payload) => {

    validateFields(payload,["message","phone"]);

    var { message, phone} = payload;

    url = `${url}/sendSMS.php?action=100&sender=ZETA&phone=${phone}&message=${message}`;

    url = encodeURI(url);

    console.log("sms-uri", url);

    request.get(url)
    .on('error', (error) =>  { throw error })
    .on('response', async (response) => {

        // console.log("sms response", response);

        var statusCode = response.statusCode;

        console.log( statusCode );
        
        await Models.SmsLog.create({
            processor: sms_driver,
            message,
            phone,
            is_sent: 1
        })

    })



}

//factory method
module.exports = async (payload) => {

    if(sms_driver == 't2geeks')  return t2geeksSmsApi(payload);

    if(sms_driver == 'twilio')  return twilioSmsApi(payload);

    throw new Error("No sms driver was selected");
        

}