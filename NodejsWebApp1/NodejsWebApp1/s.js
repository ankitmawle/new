'use strict';
var http = require('http');
var u= require('url');
var port = process.env.PORT || 1337;
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;

var fs=require('fs');
http.createServer(function (req, res) {
    if(req.url=='/l1on'){
    console.log("l1on");
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myquery = {id:"1" };
            var newvalues = { $set: {light1:'1'} };
            dbo.collection("lights").updateOne(myquery, newvalues, function(err, r) {
           if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
        }
        if(req.url=='/l1off'){
        console.log("l2on");
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var myquery = {id:'1' };
                var newvalues = { $set: {light1:'0'} };
                dbo.collection("lights").updateOne(myquery, newvalues, function(err, r) {
               if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
            }
            if(req.url=='/l2on'){
        
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("mydb");
                    var myquery = {id:"1" };
                    var newvalues = { $set: {light2:'1'} };
                    dbo.collection("lights").updateOne(myquery, newvalues, function(err, r) {
                   if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          });
                }
                if(req.url=='/l2off'){
                    console.log('l2off');
                    res.write("lll");
                   
            }
            if(req.url=='/'){
                fs.readFile('index.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
               
            });
        }
       // if(req.url=='')

    res.write("dsada");

res.end();

  }).listen(8080);
