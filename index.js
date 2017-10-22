'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const mongo = require('./mongo.js')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'YILINISANENGLISHNAME') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    var messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
	    	sendTextMessage(sender, JSON.stringify(event))
		    var text = event.message.text
		    sendTextMessage(sender, course)
		    if (event.message.quick_reply) {
            	var status = event.message.quick_reply.payload
            	//sendTextMessage(sender, status)
            	text = status
        	}
        	
		    if (text == "DRAFTQUIZ") {
		    	courseMessage(sender, "What course is this for?", "COURSEID")
				continue
		    } else if (text == "soon") {
		    	sendTextMessage(sender, "ok")
		    	continue
		    } else if (text == "bye") {
		    	sendTextMessage(sender, "bye")
		    	continue
		    }  else if (text == "away") {
		    	sendTextMessage(sender, "I will come back later")
		    	continue
		    } else {
		    	quickReply(sender, "Hello there. What would you like to do today?")
		    	continue
		    }
	    }
    }
    res.sendStatus(200)
})

const token = "EAAB4mW4xXvMBAFgOLpGfqZCcdc9OE8YSn1dGPQQ3OrCWMsQsX1GZAmaU5UHWoGlqtgwka8R4yXMNDFslQIqGW5t4E1ivqqFGCQ5uAWkk5dpIQ1sUju0GV5kQmBTFGM8lA3BeSRHzWFYt6WpWnJVKzS0Vk4EY9A6WmzXhFt52Jma9LytZCeD"

// function draftQuiz(sender, text)

function courseMessage(sender, text, payload) {
	let messageData = { 
		text:text,
	}
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
			metadata: payload
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

function quickReply(sender, text) {
	let messageData = {
		"text":text,
		"quick_replies":[
			{
				"content_type":"text",
				"title":"Make cue cards",
				"payload":"DRAFTQUIZ"
			},
			{
				"content_type":"text",
				"title":"Quiz!",
				"payload":"test"
			},
			{
				"content_type":"text",
				"title":"I'm ok",
				"payload":"ignore"
			}
		]
	}
	request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}