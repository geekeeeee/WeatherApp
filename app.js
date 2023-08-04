const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
//use the folder
let tempx=0; let imgurl="https://openweathermap.org/img/wn/10d@2x.png"; let city="Kollam"; let tmin=0; let tmax=0;
var location;let x="Partly Cloudy";
app.get("/",(req,res)=>{
    res.render("list",{wth:x ,cityname:city,temp:tempx,TMin:tmin,icon:imgurl,TMax:tmax});
})

app.post("/",function(req,res){
    location=req.body.city;
    console.log(location);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=656d405c9132108ce95709432bf7428a&units=metric#";
    https.get(url,function(response){
        response.on("data",function(data){
            let jss=JSON.parse(data);
            tempx=jss.main.temp;
            // imgurl="https://openweathermap.org/img/wn/"+jss.weather[0].icon+"@2x.png";
            city=jss.name;
            tmin=jss.main.temp_min;
            console.log(tmin);
            tmax=jss.main.temp_max;
            x=jss.weather[0].description;
            console.log(tmax);
            imgurl="https://openweathermap.org/img/wn/"+jss.weather[0].icon+"@2x.png";
            // res.render("list",{cityname:city,temp:tempx,TMax:tmax,TMin:tmin,icon:imgurl});
        })
    res.redirect("/");
    })
})

app.listen(3000,function(){
    console.log("Server activated");
})