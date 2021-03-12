const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    eventstartat : {
        type : Date,
        required : true
    },
    eventendat : {
        type : Date ,
        required : true
    },
    organisermail : {
        type : String ,
        required : true
    },
    organiserid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
} , {
    timestamps : true
})

const Event = mongoose.model( 'Event' , eventSchema )

module.exports = Event