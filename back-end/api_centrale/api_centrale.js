const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser');

let app = express()

let port = 7029

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*		TEMPORAIRES		*/
let currentUserId = "1";
/*		FIN TEMPORAIRES		*/

/*		TEST		*/
app.get('/', (req, res) => {
	res.send('{"test":"OK Tout va bien"}')
})
/*		FIN TEST		*/

/*		MESSAGE		*/
require('./routes/message_routes.js')(app,fetch,currentUserId);
/*		FIN MESSAGE		*/

/*		USER		*/
require('./routes/user_routes.js')(app, fetch);
/*		FIN USER		*/

/*		UP		*/
require('./routes/up_routes.js')(app,fetch);
/*		FIN UP		*/

app.listen(port, () => {
	console.log('le serveur minimaliste fonctionne sur le port : ' + port)
})