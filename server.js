var DBFunctions = require('./DBFunctions');

module.exports = {
    capture_parking: async function (redis,client,region) {
    var free = await DBFunctions.getStatus(client, region);
    if (free > 0) {
        DBFunctions.setStatus(redis, client, region, --free);
    }
},

free_parking: async function (redis,client,region) {
    var free = await DBFunctions.getStatus(client, region);
    var region_max = await DBFunctions.getMax(client, region);
    console.log("max" + region_max);
    if (region_max > free) {
        DBFunctions.setStatus(redis, client, region, ++free);
    }
},

getRegionParking: async function (client,region) {
    var ret = await DBFunctions.getStatus(client, region);
    return ret;
},

}