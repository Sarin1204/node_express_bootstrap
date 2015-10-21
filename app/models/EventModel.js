/**
 * Created by sarin on 10/16/15.
 */
var models = require('express-cassandra');
module.exports = {
    fields:{
        host : { "type" : "text" },
        date : { "type" : "timestamp"},
        eventname : {"type" : "text"},
        id : { "type": "timeuuid", "default": {"$db_function": "now()"} },
        location : { "type" : "text"}
    },
    key : [["host"],"date"]
}