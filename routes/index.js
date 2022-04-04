var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
const os = require('os')
const {xlsToImage} = require('../app/controller/converter')

/* GET home page. */
router.post('/xls-image', upload.single('file'), xlsToImage )
router.get('/xls-image', (req, res)=>{

    res.send("Please use POST method to convert an EXCEL file to img: https://documenter.getpostman.com/view/20332324/UVysxw2p")
})

router.get('/', (req, res)=>{

    res.redirect("/xls-image")
})

module.exports = router;
