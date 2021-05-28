const Record = require('../model/Record');

exports.recordnings = async (req,res) => {
    const recordnings = await Record.find({})
    try {
        if(recordnings){
            return res.status(200).json({recordnings: recordnings});
        } else {
            return res.status(400).json({error: 'No recordnings exists'})
        }
    } catch (error) {
        res.status(500).json({error: 'Database error'})
    }
}

exports.add = async (req,res) => {
    const recordnings = req.body
    recordnings.map((rec) => {
        await Record.create({title: rec.title, uri: rec.uri, date: rec.date})
    })
    res.status(201).json({success: "Recordning saved!"})
};

