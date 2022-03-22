const grpc = require("grpc");

//const Models = require("../db/main");

const protoLoader = require("@grpc/proto-loader");

const protoConfig = require("../config/grpc");

exports.proto =  grpc.loadPackageDefinition(
    protoLoader.loadSync( __dirname +  "/../proto/notification.proto", protoConfig)

);

const sms_util = require("../utils/sms");

const mailer = require("../utils/mailer");

const { send_sqs_message }  = require("../utils/sqs");

exports.addSmsNotification = async (_, callback) => {

    try{

        var { message, phone, priority  } = _.request;

        console.log(_.request);

        if(!message)  throw new Error("Message attribute is required");

        if(!phone)  throw new Error("Phone attribute is required");

        if(!priority)  throw new Error("Priority attribute is required");

        switch(priority) {
            case 1:
                //send sms immediately
                sms_util({ message, phone });
                break;
            default:
               await send_sqs_message({}, { channel: "sms", message, phone }); 
        }

        callback(null,{ status: 200 })
  
    }catch(error){

        console.error({error});

        callback({
            code: grpc.status.INTERNAL,
            error_msg: error.message,
            details: "Not found"
        })

    }
}

exports.addEmailNotification = async (call, callback) => {

    try{

        var {  message, email, priority, type, template ,schedule_date  } = _ ;

        if(!message)  throw new Error("Message attribute is required");

        if(!email)  throw new Error("Email attribute is required");

        if(!priority) priority = 1;

        if(!type) type = "single";

        if(!template) template = "welcome";

        switch(priority) {
            case 1:
                //send sms immediately
                await mailer({ email: "edjonorh@gmail.com",subject: "hey there", text : message , template }).catch(error => console.log(error));

                break;
            default:

                await send_sqs_message({}, { channel: "email", message, email, template}); 
        }

        callback(null,{ status: 200})
  
    }catch(error){

        callback({
            code: grpc.status.INTERNAL,
            error_msg: error.message,
            details: "Not found"
        })

    }


}


exports.addPushNotification = async (call, callback) => {

    try{

        callback(null,{ status: 200})

    }catch(error){

        callback({
            code: grpc.status.INTERNAL,
            error_msg: error.message,
            details: "Not found"
        })

    }


}




