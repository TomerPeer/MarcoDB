var express = require('express');
var app = express();
var redis = require('redis');
var client = redis.createClient(15218, 'hackaton-redis1.northeurope.cloudapp.azure.com');
var server = require('./server');
var DBFunctions = require('./DBFunctions');

app.get('/', async function (req, res) {
    var val = await server.getRegionParking(client,req.query.region);
    res.send(val);
});
app.get('/man', function (req, res) {
    res.send('USB');
});
app.get('/free',async function(req,res) {
    server.free_parking(redis,client,req.query.region);
var val = await server.getRegionParking(client,req.query.region);
res.send(val);
})
app.get('/set_max',function(req,res){
    DBFunctions.setMax(redis,client,req.query.region,50);
})
app.get('/capture',async function(req,res) {
    console.log(req.query.region);
    server.capture_parking(redis,client,req.query.region);
    var val = await server.getRegionParking(client,req.query.region);
    res.send(val);
    })
console.log('Server Started..');
app.listen(3000);
