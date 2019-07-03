var express = require('express');
var app = express();
var redis = require('redis');
var client = redis.createClient(15218, 'hackaton-redis1.northeurope.cloudapp.azure.com');
var server = require('./server');
var DBFunctions = require('./DBFunctions');

app.locals.moment = require('moment');
app.get('/free',async function(req,res) {
    if(typeof req.query.region != 'undefined')
    {
    server.free_parking(redis,client,req.query.region);
    var val = await server.getRegionParking(client,req.query.region);
    res.send(val);
    }
    else if (typeof req.query.general != 'undefined')
    {
        server.free_gen_park(redis,client,req.query.general,'11/11/1999');
    }
})
app.get('/set_max',function(req,res){
    DBFunctions.setMax(redis,client,req.query.region,req.query.max);
})
app.get('/capture',async function(req,res) {
    if(typeof req.query.region != 'undefined')
    {
    server.capture_parking(redis,client,req.query.region);
    var val = await server.getRegionParking(client,req.query.region);
    res.send(val);
    }
    else if (typeof req.query.general != 'undefined' &&
             typeof req.query.user != 'undefined')
    {
        server.capture_gen_park(redis,client,req.query.general,'11/11/1999',req.query.user);
    }
    })
app.get('/get_region_status',async function(req,res){
    var region_status = await server.getRegionParking(client,req.query.region);
    res.send(region_status);
})
app.get('/get_general_status',async function(req,res){
    var general_status = await server.getGeneralParking(client,req.query.general,'11/11/1999');
})
console.log('Server Started..');
app.listen(3000);
