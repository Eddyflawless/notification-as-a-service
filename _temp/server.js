
require('dotenv').config({ path: '.dev.env' });

const ErrorHandler = require("./src/utils/errorhandler");


try{	
	
	var cron = require('node-cron');
		
	const port  = process.env.PORT;
	//
	const grpc = require("grpc");
	
	//import services
	const notificationSvc = require("./src/services/notification.service");
	
	const notificationProto = notificationSvc.proto;
	
	const grpc_server = new grpc.Server();
	
	grpc_server.addService(notificationProto.NotificationService.service, {
	  AddSmsNotification: notificationSvc.addSmsNotification,
	  AddEmailNotification: notificationSvc.addEmailNotification,
	  AddPusherNotification: notificationSvc.addPusherNotification
	
	})
	
	var host_ip = `127.0.0.1:${port}`;
	
	grpc_server.bindAsync(`${host_ip}`, grpc.ServerCredentials.createInsecure(), () => {
	  grpc_server.start();
	});
	
	console.log(`Grpc server running at http://${host_ip}`);
	
	
	cron.schedule('* * * * *', () => {
	  //call worker file
	  require("./src/worker");
	});

}catch(err){ 
	console.log(err);
	ErrorHandler(err);

}


