module.exports = {
    getStatus: async function (client, region) {
        var delay = require('delay');
        var res;
        client.get(region,
            function (error, result) {
                if (error) {
                    console.log(error);

                    throw error;
                }
                res = result;
            });
        while (res === undefined) {
            await delay(10);
        }
        return res;
    },
    getGenStatus: async function(client, general,date) {
        var delay = require('delay');
        var res;
        client.get(general + "-" + date,
            function (error, result) {
                if (error) {
                    console.log(error);

                    throw error;
                }
                res = result;
            });
        while (res === undefined) {
            await delay(10);
        }
        console.log(res);
        return res;
    },
    setStatus: function (redis, client, region, status) {
        client.set(region, status, redis.print);
    },
    getMax: async function (client, region) {
        var delay = require('delay');
        var res;
        client.get("max_" + region,
            function (error, result) {
                if (error) {
                    console.log(error);

                    throw error;
                }
                res = result;
            });
        while (res === undefined) {
            await delay(10);
        }
        return res;
    },
    setMax: function(redis, client, region, max) {
        client.set("max_"+region, max, redis.print);
    },
    setGenStat: function(redis, client,general,date,status,user) {
        client.set(general + '-' + date,status + ' ' + user,redis.print);
    }
};