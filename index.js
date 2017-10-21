// Twilio Credentials
const accountSid = 'AC6b9df5ceb8e340c7619de143c49016fe';
const authToken = '13828da7ff19fba2a8797e49c1cbf810';
const client = require('twilio')(accountSid, authToken);
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

app.post('/', function (req, res) {
	console.log(req.body)
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
    client.messages
	  .create({
	    to: '+15143469097',
	    from: '+13658006707',
	    body: "Tomorrow's forecast in Financial District, San Francisco is Clear",
	  })
	  .then((message) => console.log(message.sid));

})