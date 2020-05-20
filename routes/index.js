var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/testCertificado', function(req, res, next) {
  console.log('req.protocol is ', req.protocol);
  console.log('req.secure is ', req.secure);
  res.status(200).send("ok");
});


module.exports = router;
