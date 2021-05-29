const router = require('express').Router();
const RecordingController = require('../controller/recordings');


router.get('/', RecordingController.recordings);
router.post('/add', RecordingController.add);

module.exports = router;