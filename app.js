const express = require("express");
const bodyParder = require("body-parser");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html") ;
})


app.post("/",function(req,res){

    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    var data ={
        members  :[ {
            email_address : email,
            status : "subcribed",
            merge_fields : {
                FNAME : firstName,
                LNAME : lastName
            }
        }
    ]
    };
    var jsonData= JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/7f0e97b271";
    const options ={
        method : "POST",
        auth :"krindy:b7baf83ce6fddf6378392a7f1e770b50-us21", // replace with your mail chimp api key
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    });
    
    request.write(jsonData);
    request.end();

});


app.post("/failure",function(req,res){
    res.redirect("/");
});




app.listen(process.env.PORT || 3000,function(){
    console.log("Server is up and running");
});


// 7f0e97b271

// b7baf83ce6fddf6378392a7f1e770b50-us21