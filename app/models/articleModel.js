/**
 * Created by sarin on 10/18/15.
 */
module.exports = {

    fields: {
        creator: {"type": "text"},
        created: {"type": "timestamp"},
        content: {"type": "text"},
        title: {"type": "text",
            rule:{
                validator: function(value){return value.length > 0;},
                message: 'Title cannot be blank'
            }
        }
    },
    key: [["creator"],"created"]

};