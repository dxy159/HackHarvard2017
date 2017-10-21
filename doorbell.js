// Twilio Credentials
const accountSid = 'AC6b9df5ceb8e340c7619de143c49016fe';
const authToken = '13828da7ff19fba2a8797e49c1cbf810';
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
    to: '+15143469097',
    from: '+13658006707',
    body: "Tomorrow's forecast in Financial District, San Francisco is Clear",
  })
  .then((message) => console.log(message.sid));
