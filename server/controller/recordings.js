const Record = require('../model/Record');

exports.recordings = async (req,res) => {
    const recordings = await Record.find({})
    try {
        if(recordings){
            return res.status(200).json({recordings: recordings});
        } else {
            return res.status(400).json({error: 'No recordings exists'})
        }
    } catch (error) {
        res.status(500).json({error: 'Database error'})
    }
}

exports.add = async (req,res) => {
    const recordings = req.body
    recordings.map((rec) => {
        Record.create({title: rec.title, uri: rec.uri, date: rec.date})
    })
    res.status(201).json({success: "Recording saved!"})
};

exports.delete = async (req,res) => {
    const id = req.params.id;
    await Record.deleteOne({_id: id});
    res.status(200).json({succsse: `Recording ${id} has been deleted`})
}