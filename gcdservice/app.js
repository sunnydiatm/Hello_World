var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

//Connect to mongoose
mongoose.connect('mongodb://localhost/gcd');
var db = mongoose.connection;

//model
gcd = require('./models/gcd');

app.get('/', function(req, res){
	res.send('Please use /gcd for GCD calculation or /gcdList for listing');
});


app.get('/gcdList',function(req, res){
	gcd.listGCD(function(err, listOfGCD){
		if(err){
			throw err;
		}
		res.json(listOfGCD);
	});
});

app.post('/gcd',function(req, res){
	var gcdBody = req.body;
	var a = gcdBody.firstOperand ;
	var b = gcdBody.secondOperand ;
	var gcdResult = calculateGCD(a,b);
	gcdBody.Result = gcdResult;
	console.log('Entered app, The GCD result is - ' +gcdResult);
	gcd.addGCD(gcdBody, function(err, gcdBody){
		if(err){
			console.log('Entered app, calling not successful' +err);
			throw err;
		}
		res.json(gcdBody);
	});
});

function calculateGCD(a, b) {
    if ( ! b) {
        return a;
    }
    return calculateGCD(b, a % b);
};

app.listen(3000);
console.log('Server is listening on 3000');