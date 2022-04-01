import { admin } from '../firebase-config'

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

exports.sendNotification = async (registrationToken, message, options={}) => {

    var options = { ...notification_options, ...options };

    var response = await admin.messaging().sendToDevice(registrationToken, message, options);

    return response
    
}