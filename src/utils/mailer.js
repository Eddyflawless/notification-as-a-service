"use strict";

require('dotenv').config({ path: '.dev.env' }); 

const nodeMailerConfig = require("../config").config.mail;

const fs = require('fs');

const path = require('path');

const handlebars = require('handlebars');

const nodemailer = require("nodemailer");

const {  validateFields  } = require("./field-validator");


const mailerHelper = function(data){


  validateFields(data, ['subject', 'text', 'email'])


  var {subject,text,email, template } = data;

  if(!template) template = "default";

  var to = email.toString();

  if(!template) template = "default";

  const mailTemplateSource = fs.readFileSync(path.join(__dirname, `/../mail/${template}.hbs`), "utf8");

  template = handlebars.compile(mailTemplateSource);

  const htmlTemplate = template({ subject, message: text });

  return main(to,subject,text, htmlTemplate);

};

// async..await is not allowed in global scope, must use a wrapper
async function main(to,subject,text,htmlTemplate) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let mailAccount;

  if(!process.env.APP_DEBUG){

    mailAccount = { user: process.env.MAIL_USER, password: process.env.MAIL_PASSWORD}
  }else{
    mailAccount = await nodemailer.createTestAccount();  // generated ethereal user and password
  }

  console.log({ mailAccount: mailAccount})

  nodeMailerConfig.auth['user'] = mailAccount.user;
  nodeMailerConfig.auth['pass'] = mailAccount.pass;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(nodeMailerConfig);

  var mail_from = (process.env.MAIL_FROM)? process.env.MAIL_FROM: "vl0rd";

  const mailOptions = {
    from: mail_from, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html: htmlTemplate, // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  var testMessageUrl = nodemailer.getTestMessageUrl(info)
  console.log("Preview URL: %s", testMessageUrl);
  
  return testMessageUrl;
}

//main().catch(console.error);

module.exports = mailerHelper;
