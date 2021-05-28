const router = require('express').Router();
const RecordningController = require('../controller/recordings');


router.get('/', RecordningController.recordnings);
router.post('/add', RecordningController.add);

module.exports = router;