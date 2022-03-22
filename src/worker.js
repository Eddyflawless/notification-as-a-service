const sms_util= require("./utils/sms");

const mailer = require("./utils/mailer");

const pusher = require("./utils/pusher");

const { receive_sqs_message,  deleteSqsMessage } = require("./utils/sqs");

const ErrorHandler = require("./utils/errorhandler");

const getNotificationFn = (channel) => {

    var notifier;

    switch(channel) {
        case 'sms':
            notifier = sms_util;
            break;
        case 'email':
            notifier = mailer;
            break;
        case 'push':
            notifier = pusher;
            break;
        default:
            notifier = sms_util;            
    }

    return notifier;

}


async function worker(){


    try {
        
        const Messages = await receive_sqs_message();

        if(!Messages)  return;

        for(var i = 0; i < Messages.length; i++){

            var message = Messages[i];

            const payload =  JSON.parse(message.Body);
        
            const  { channel } = payload;
            
            var notifier = getNotificationFn(channel);
    
            if(!notifier) continue;

            await notifier(payload);

            console.log(`send notification ${channel}`, payload);
    
            //delete messafe so we wont have to handle it again
            await deleteSqsMessage(message);
        }



    } catch (error) {
        console.error(error, error.stack);
        ErrorHandler(error); 
    }


}


module.exports = worker;
