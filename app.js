var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var publishingService = require('./server/publishing-service')
var lessMiddleware = require("less-middleware");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: 'application/json' } ));

const port = 3000;
const router = express.Router();
var rest = require('rest');
// test route
router.get('/publishing', function (req, res) { 
     return publishingService.Get().then((response)=>{
        res.json(response);    
     });
});
router.post('/publishing', function (req, res) { 
    console.log(req.body);
     return publishingService.Create(req.body).then((response)=>{
        res.json(response);    
     });
});
router.put('/publishing', function (req, res) { 
     return publishingService.Update(req.body).then((response)=>{
        res.json(response);    
     });
});
router.delete('/publishing', function (req, res) { 
     return publishingService.Delete(req.query.id).then((response)=>{
        res.json(response);    
     });
});
console.log(__dirname);

// prefixed all routes with /api
app.use('/api', router);

app.use(lessMiddleware(__dirname + '/Client'));
app.use("/", express.static(__dirname + "/Client"));
app.use("/", express.static(__dirname + "/node_modules"));
app.listen(port);
console.log('http://127.0.0.1:' + port + '/api');


