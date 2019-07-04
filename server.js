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
free_gen_park: async function (redis,client,general,date) {
    DBFunctions.setGenStat(redis,client,general,date,"FREE",'');
},
capture_gen_park: async function (redis,client,general,date,user) {
    var status = await DBFunctions.getGenStatus(client,general,date);
    if (status.substring(0,8)!="CAPTURED") { DBFunctions.setGenStat(redis,client,general,date,"CAPTURED",user); }
},
getRegionParking: async function (client,region) {
    var ret = await DBFunctions.getStatus(client, region);
    return ret;
},
getGeneralParking: async function (client,general,date) {
    var ret = await DBFunctions.getGenStatus(client, general,date);
    return ret;
},
}