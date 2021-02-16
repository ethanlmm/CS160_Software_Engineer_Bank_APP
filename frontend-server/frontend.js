const express = require('express');
const bodyParser = require('body-parser');

var multer = require('multer');
var forms = multer();
const router = express()
var fs = require('fs');
router.listen('5002', () => {
    console.log('listening on 5002');
});
router.use(bodyParser.json());
router.use(forms.array());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('./frontend-server/public'))
router.get('*', function(req, res) {
    res.sendfile('./frontend-server/public/index.html');

});
