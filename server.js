var express = require('express');
var app = express();
var redis = require('redis');
var client = redis.createClient(15218, 'hackaton-redis1.northeurope.cloudapp.azure.com');
var helpers = require('./DBFunctions');

async function capture_parking(region) {
    var free = await helpers.getStatus(client, region);
    if (free > 0) {
        helpers.setStatus(redis, client, region, --free);
    }
}

async function free_parking(region) {
    var free = await helpers.getStatus(client, region);
    var region_max = await helpers.getMax(client, region);
    console.log("max" + region_max);
    if (region_max > free) {
        helpers.setStatus(redis, client, region, ++free);
    }
}

async function getRegionParking(region) {
    var ret = await helpers.getStatus(client, region);
    return ret;
}


async function update_db(props) {
    var yellow = await helpers.getStatus(client, "yellow");
    helpers.setStatus(redis, client, "yellow", ++yellow);
    client.on('error',
        function (err) {
            console.log('Something went wrong ' + err);
        });
}

async function try_get(func) {
    if (func === "free") {
        await free_parking("yellow");
    } else if (func === "capture") {
        await capture_parking("yellow");
    }
    await getRegionParking("yellow");
    console.log("get:" + await getRegionParking("yellow"));
}

app.get('/', async function (req, res) {
    var val = await getRegionParking("yellow");
    res.send(val);
});
app.get('/man', function (req, res) {
    res.send('USB');
});
console.log('Server Started..');
app.listen(3000);