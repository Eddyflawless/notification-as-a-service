import { admin } from '../firebase-config'

exports.sendNotification = async (registrationToken, message, options={}) => {


    var response = await admin.messaging().sendToDevice(registrationToken, message, options);

    return response
    
}