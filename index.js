const express = require("express");
const app = express();
const https = require("https")
const bodyParser = require("body-parser")



app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    res.set("Content-Type", "text/html")
    res.sendFile(__dirname + "/signUp.html")
})

app.post("/", function(req, res){
    var fName = req.body.first
    var lName = req.body.last
    var email = req.body.email

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fName,
                    LNAME : lName
                }

                
            }
            
        ] 
    }

    const jsonData = JSON.stringify(data)
    var url = "https://us2.api.mailchimp.com/3.0/lists/3098910af3"
    const options = {
        method: "POST",
        auth : "bruce419:beefe8299db73d16b1308337b15ed00c-us21" 
    }
    
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(jsonData)
    request.end()

   

})

app.post("/failure", function(req, res){
    res.redirect("/")
})





// beefe8299db73d16b1308337b15ed00c-us21
// 3098910af3








app.listen(3000, function(){
    console.log("Server running on port 3000");
})