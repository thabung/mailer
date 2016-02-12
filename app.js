
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var nodemailer = require('nodemailer');
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/mail',function(req,res) {

var requestBody = req.body;
//requestBody.to;



var messageData = {
            to:requestBody.to,
            from: requestBody.from,
            subject: requestBody.subject,
            html: requestBody.body,
            bcc:requestBody.bcc,
            generateTextFromHTML: true
        };
var trans = nodemailer.createTransport();

trans.sendMail(messageData, function(err) {

  if (err) {
    console.log("message sending failed");
    console.log(err);
  } else {
    console.log("Mail sent");  
  }
  
}
);



  res.send('hello world');



});



app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
