var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { time:new Date(),humidity:'5', temperature:'6',gas:'0'};
  dbo.collection("sensor").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log(new Date);
    console.log("1 document inserted");
    db.close();
  });
});