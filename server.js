const express=require("express");
const app=express();
const cors=require('cors');
const bodyParser=require("body-parser");
const bcrypt=require('bcrypt-nodejs');
const knex=require('knex');
const register=require("./controllers/register");
const Signin=require("./controllers/Signin");
const profile=require("./controllers/profile");
const image=require("./controllers/image");

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{

    res.json(database.users);  
})
app.get("/",(req,res)=>{res.json("it is working")});
app.post("/signin",(req,res)=>{ Signin.handleSignIn(req,res,db,bcrypt)});  
app.post("/register",(req,res)=>{ register.handleRegister(req,res,db,bcrypt)});
app.get("/profile/:id",(req,res)=>{ profile.handleProfile(req,res,db)});
app.put("/image",(req,res)=>{ image.handleImage(req,res,db)});
app.post("/imageurl",(req,res)=>{ image.apiCall(req,res)});

app.listen(process.env.PORT||3000);








// 1 /signin -----> post success/fail
// 2 /register----->post user
// 3 /profile/:userid------> get profile
// 4 /image ---------> put user
