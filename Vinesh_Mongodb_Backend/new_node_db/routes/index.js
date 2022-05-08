var express = require('express');
var router = express.Router();

const imagesmodule = require('../src/data/image');
router.use("/image", imagesmodule);
module.exports = router;

