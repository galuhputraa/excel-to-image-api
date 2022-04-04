var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
const os = require('os')
const {xlsToImage} = require('../app/controller/converter')

/* GET home page. */
router.post('/xls-image', upload.single('file'), xlsToImage )

module.exports = router;
