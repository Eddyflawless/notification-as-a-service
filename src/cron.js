const cron = require('node-cron');

const worker = require("./worker");


//every 30 minutes
/**
 * queries redis instance more (on Produdtion)
 * but hits db (on development)
 */
cron.schedule('* * * * *', async () => {
	//call worker file    
    worker();
	
});

