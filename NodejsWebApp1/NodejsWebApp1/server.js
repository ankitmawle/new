'use strict';
var http = require('http');
var u= require('url');
var port = process.env.PORT || 1337;
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;

var fs=require('fs');
http.createServer(function (req, res) {
    //var url=req.url;
    if(req.url=='/l1on'){
        
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myquery = {id:"1" };
            var newvalues = { $set: {light1:'1'} };
            dbo.collection("lights").updateOne(myquery, newvalues, function(err, r) {
           if (err) throw err;
      console.log("1 document inserted");
      db.close();
      res.end();
    });
  });
        }
        else if(req.url=='/l1off'){
        
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var myquery = {id:'1' };
                var newvalues = { $set: {light1:'0'} };
                dbo.collection("lights").updateOne(myquery, newvalues, function(err, r) {
               if (err) throw err;
          console.log("1 document inserted");
          db.close();
          res.end();
        });
      });
            }
            else if(req.url=='/l2on'){
        
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("mydb");
                    var myquery = {id:"1" };
                    var newvalues = { $set: {light2:'1'} };
                    dbo.collection("lights").updateOne(myquery, newvalues, function(err, r) {
                   if (err) throw err;
              console.log("1 document inserted");
              db.close();
              res.end();
            });
          });
                }
               else if(req.url=='/l2off'){
                   
                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var dbo = db.db("mydb");
                        var myquery = {id:"1" };
                        var newvalues = { $set: {light2:'0'} };
                        dbo.collection("lights").updateOne(myquery, newvalues, function(err, r) {
                       if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                  res.end();
                });
              });
             
            }
            else if(req.url=='/'){
                fs.readFile('index.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        }
        else if (req.url=='/light'){
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.collection("lights").find({}).toArray(function(err, result) {
                  if (err) throw err;
                  res.write(JSON.stringify(result));
                  db.close();
                  res.end();
                });
              });
        }
        else if(u.parse(req.url,true).pathname=="/data"){
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                if(u.parse(req.url,true).query.d=="0"){
                dbo.collection("sensor").find({},{projection: { _id: 0,time:1, humidity:1  }}).toArray(function(err, result) {
                  if (err) throw err;
                  res.write(JSON.stringify(result));
                  console.log(result);
                  db.close();
                  res.end();
                });}
                else if(u.parse(req.url,true).query.d=="1"){
                    dbo.collection("sensor").find({},{projection: { _id: 0,time:1, temperature:1  }}).toArray(function(err, result) {
                      if (err) throw err;
                      res.write(JSON.stringify(result));
                      console.log(result);
                      db.close();
                      res.end();
                    });}
                else if(u.parse(req.url,true).query.d=="2"){
                    dbo.collection("sensor").find({},{projection: { _id: 0,time:1, gas:1  }}).toArray(function(err, result) {
                    if (err) throw err;
                    res.write(JSON.stringify(result));
                          console.log(result);
                          db.close();
                          res.end();
                        });}
                
                else{

                    res.write("dasd");
                    res.end;
                }


              });
        }
        else if (u.parse(req.url,true).pathname=="/update"){
            MongoClient.connect(url, function(err, db) {
            if (err) throw err;
             var dbo = db.db("mydb");
             var d=new Date();
             var myobj = { time:Date.parse(d),humidity:u.parse(req.url,true).query.humidity, temperature:u.parse(req.url,true).query.temperature,gas:u.parse(req.url,true).query.gas};
              dbo.collection("sensor").insertOne(myobj, function(err, r) {
                   if (err) throw err;
                   console.log(new Date);
                    console.log("1 document inserted");
               db.close();
               res.write("sucess");
               res.end();
                 });
                });
                }
        
else{
    res.write("no page found");
    res.end();
}


  }).listen(8080);
