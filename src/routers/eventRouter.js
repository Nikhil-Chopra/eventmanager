const express = require('express');
const router = new express.Router();
const Event = require('../models/eventModel');
const auth = require('../auth');

// to create event input should be title and 
// start time and end time in time format    2021-03-11T05:22:2 

router.post('/createevent',auth , async (req,res) => {
    try {
        // console.log(req)
        // console.log(req.body)
        const eventdata = new Event({
            ...req.body,
            organisermail : req.user.email ,
            organiserid : req.user._id
        })
        await eventdata.save()
        res.status(201).send("successful");
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/futureevents', auth ,async (req,res) => {
    try{
        // console.log(1)
        const curDate = new Date()
        var events = await Event.find()
        events = events.filter((eve) => {
            return eve.eventstartat > curDate
        })
        events.sort((a,b) => (a.eventstartat-b.eventstartat))
        res.send(events)
    }catch(e){
        res.status(404).send(e);
    }
})

router.get('/pastevents', auth ,async (req,res) => {
    try{
        // console.log(11)
        const curDate = new Date()
        var events = await Event.find()
        events = events.filter((eve) => {
            return eve.eventendat < curDate
        })
        events.sort((a,b) => (b.eventendat-a.eventendat))
        res.send(events)
    }catch(e){
        res.status(404).send(e);
    }
})

router.get('/presentevents',auth ,async (req,res) => {
    try{
        // console.log(111)
        const curDate = new Date()
        var events = await Event.find()
        events = events.filter((eve) => {
            return ((eve.eventstartat <= curDate) && 
            (eve.eventendat >= curDate))
        })
        events.sort((a,b) => (a.eventstartat-b.eventstartat))
        res.send(events)
    }catch(e){
        res.status(404).send(e);
    }
})

module.exports = router