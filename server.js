const express = require('express')
const mongoose = require('mongoose')
const app = express()
const employees = require("./model")
const router = express.Router()

const port = 4000

var data = [
    {
        name: "John",
        age: 21,
        location: "New York"
    },
    {
        name: "Smith",
        age: 27,
        location: "Texas"
    },
    {
        name: "Lisa",
        age: 23,
        location: "Chicago"
    },
    {
        name: "Stella",
        age: 21,
        location: "Bangalore"
    },
    {
        name: "Kim",
        age: 20,
        location: "Seoul"
    },
]

var uri = "mongodb://localhost:27017/details"

mongoose.connect(uri, {useUnifiedTopology:true, useNewUrlParser: true})

const connection = mongoose.connection

connection.once("open", function(err){
    if(err){
        console.log("not able to connect!")
    }
    else{
        console.log("Mongodb database connection established successfully")
    }
   
})

app.use("/",router)

router.route("/insertdata").post(function(req,res){
    employees.insertMany(data, function(err, result){
        if(err){
            res.send(err)
            res.send("error not able to insert data")
        }else {
            res.send(result)
        }
    })

})

router.route("/fetchdata").get(function(req, res) {
    employees.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  router.route("/updatedata").put(function(req, res){
      employees.updateMany({'name':'Stella'},{$set:{'name':'Andrew'}},function(err,result){
        if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
      })
  })

  router.route("/deletedata").delete(function(req, res){
      employees.deleteMany({'name':'Stella'}, function(err,result){
          if(err){
              res.send(err)
          }else{
              res.send(result)
          }
      })
  })

app.listen(port, function(){
    console.log("server is running on port: "+port)
})