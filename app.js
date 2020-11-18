const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const request = require('request');
const mailchimp = require('mailchimp');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/e784773fa9";

  const options = {
    method: "POST",
    auth: "Agam:d2b43677212632c30f512e3175e28a09-us7"
  };


  const request = https.request(url,  options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }
    else {
      res.sendFile(__dirname + "/failure.html")
    }
  });

  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
  console.log("server running on port 3000")
})

// list id e784773fa9
//d2b43677212632c30f512e3175e28a09-us7
