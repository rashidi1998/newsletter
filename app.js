const express = require("express");
const bodyParser = require("body-parser");

const https = require('https')

const e = require("express");
const { request } = require("http");

const app = express();
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static("public"))
app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on 3000")
})
app.get("/",function(req,res) {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/",function(req,res) {
    const fname = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data)

     const url = "https://us1.api.mailchimp.com/3.0/lists/35544881de";

     const options = {
         method: "POST",
         auth: "rashid98:8cab4a57d792add1ae91046dd0c8c980-us1"
     }

    const request =  https.request(url,options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data))
        })
        if(response.statusCode == 200 ) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/");
})

// 8cab4a57d792add1ae91046dd0c8c980-us1

// list id
// 35544881de