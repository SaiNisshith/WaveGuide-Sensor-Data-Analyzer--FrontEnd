const express = require('express');
const router = express.Router();

const TimeVsTemp = require('../models/timevstemp');
const mongoose = require('../config/mongoose');
const global_variable = require('../models/variables');
const path = require('path');

console.log("Router is loaded");



router.get("/get_temp_data/:sensor",async (req,res)=>{
    try{
        let sensor = parseInt(req.params.sensor);
        let plot = await TimeVsTemp.find({});
        let x = [],y=[];
        for(let i=0; i<plot.length; i++){
            let time = new Date(plot[i].createdAt + (5*60*60*1000 + 30*60*1000));
            x.push(time.getDate()+"/"+(time.getMonth()+1)+"/"+time.getFullYear() +" ; "+ time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
            y.push(parseFloat(plot[i].temperature[sensor-1]));
        }
        return res.status(200).send({
            x : x,
            y : y
        })
    }catch(error){
        return res.status(422).json({
            "error" : "Error occured while getting the temp vs time data"
        })
    }
})


router.use('/download',require('./download'));

router.get('/',async (req,res)=>{
    let go = await global_variable.find({});
    return res.render('main',{
        global_variable : go[0]
    });
})
module.exports = router;





module.exports = router;