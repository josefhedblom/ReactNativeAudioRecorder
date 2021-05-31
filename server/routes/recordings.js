const router = require('express').Router();
const RecordingController = require('../controller/recordings');


router.get('/', RecordingController.recordings);
router.post('/add', RecordingController.add);
router.delete('/:id', RecordingController.delete);

module.exports = router;