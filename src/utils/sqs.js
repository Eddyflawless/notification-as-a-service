
require('dotenv').config({ path: '.dev.env' });

var AWS = require('aws-sdk');

var sqs_config = require("../config").config.sqs.queueName;

var credentials = sqs_config.credentials;

// Set credentials
AWS.config.update(credentials);

const accountId = sqs_config.accountId;
const queueName = sqs_config.queueName; //staging
const region = sqs_config.region;
const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;

const sqs_client = new AWS.SQS({apiVersion: '2012-11-05'});


module.exports.send_sqs_message = (payload) => {

    const {MessageAttributes, MessageBody } = payload;

    const params = {
        DelaySeconds: 10,
        QueueUrl: queueUrl,
        MessageAttributes,
        MessageBody
    };

    try{

        sqs_client.sendMessage(params, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data.MessageId);
            }
          });

    }catch (error) {

        console.log(error);
    }


};

module.exports.receive_sqs_message = async () => {
    
    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,//number of messages to pull
        VisibilityTimeout: 10,
        WaitTimeSeconds: 0
    };

    try {
        
        const data = await sqs_client.receiveMessage(params).promise();
        
        return data.Messages;

    } catch (error) {
        console.log(error,error.stack);
        //send to sentry
        return null
    }


};

module.exports.deleteSqsMessage = async function (message) {

    const delete_params = {
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle
    }
    //delete messafe so we wont have to handle it again
    await sqs_client.deleteMessage(delete_params).promise();

}
