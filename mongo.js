var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin:admin@ds037195.mlab.com:37195/quizzzes";

function getUsers(name, callback) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var collection = db.collection('users');
	  collection.findOne(
	  	{
	  		'name': name
	  	}, function(err, result) {
	  		if (err) {
	  			console.log("Error");
	  			//res.status(500).send(Error);
	  		} else {
	  			callback(result);
	  			//res.status(200).json(result);
	  		}
	  	}
	  );
	  db.close();
	});
}

function insertUser(id, questions) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var collection = db.collection('users');
		var data = {
			"name": id,
			"questions": questions
		}
		
		collection.insertOne(data);
		db.close();
	});
}

//insertUser("Yilin", []);

// getUsers("Yilin", function(data) {
// 	console.log(data);
// });

module.exports = {
	get: getUsers,
	insert: insertUser
}



