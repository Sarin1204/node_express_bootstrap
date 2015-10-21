/**
 * Created by sarin on 10/16/15.
 */
module.exports = {
    "fields": {
        "id"     : { "type": "uuid", "default": {"$db_function": "uuid()"} },
        "name"   : { "type": "varchar", "default": "no name provided"},
        "surname"   : { "type": "varchar", "default": "no surname provided"},
        "completename" : { "type": "varchar", "default": function(){ return this.name + ' ' + this.surname;}},
        "age"    :  { "type": "int",
                        rule : function(value){ return value > 0; }
                    },
        "created"     : {"type": "timestamp", "default" : {"$db_function": "dateOf(now())"} }
    },
    "key" : [["id"],"created"]
}