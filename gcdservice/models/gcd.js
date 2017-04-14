var mongoose = require('mongoose');

//GCD Schema
var gcdSchema = mongoose.Schema({
	firstOperand:{
		type:Number,
		required:true
	},
	secondOperand:{
		type:Number,
		required:true
	},
	Result:{
		type:Number,
		required:true
	}
	
});

var gcd = module.exports = mongoose.model('gcd',gcdSchema);

//list of GCD
module.exports.listGCD= function(callback, limit){
	gcd.find(callback).limit(limit);
}

//Add GCD 
module.exports.addGCD = function(gcdBody,callback){
	console.log('Entered gcd model, calling');
	gcd.create(gcdBody,callback);
	console.log('Entered gcd model, calling successful');
}



