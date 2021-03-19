const mysql = require('mysql');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'zceltonma',
          password : '2crvcwah',
          database : 'zfm1-zceltonma'
        });
		
connection.connect((err) => {
	if (err) throw err;
console.log("Connecté !");});
					
app.get('/table/:name', (req,res) => {
	console.log("SELECT COUNT(*) FROM " + req.params.name);
	connection.query('SELECT COUNT(*) FROM ' + req.params.name, function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results[0]);
		});
})

app.get('/getUserById', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('SELECT * FROM GRPN_User WHERE userId=' + data.userId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})


app.post('/createUser', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('INSERT INTO GRPN_User (userLastName, userFirstName, userPassword, isAdmin, institutionId) VALUES(' + data.userLastName + ',' + data.userFirstName + ',' + data.userPassword +',' + data.isAdmin + ',' + data.institutionId +');', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/updateUser', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('UPDATE GRPN_User SET userFirstName=' + data.userFirstName + ', userLastName=' + data.userLastName + ', userPassword=' + data.userPassword + ', isAdmin=' + data.isAdmin + ', institutionId=' + data.institutionId + ' WHERE userId=' + data.userId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.get('/getInstitutionByID', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('SELECT * FROM Institution WHERE institutionId=' + data.institutionId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/createInstitution', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('INSERT INTO Institution (institutionId, institutionName) VALUES(' + data.institutionId + ',' + data.institutionName + ');', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/updateInstitution', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('UPDATE Institution SET institutionName=' + data.institutionName + ' WHERE institutionId=' + data.institutionId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.get('/getTrainingModules', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('SELECT * FROM TrainingModule;', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.get('/getTrainingModulesByUser', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('SELECT * FROM TrainingModule WHERE userId= '+ data.userId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/createTrainingModule', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('INSERT INTO TrainingModule (trainingModuleId, trainingModuleName, userId) VALUES(' + data.trainingModuleId + ',' + data.trainingModuleName + ',' + data.userId + ');', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/updateTrainingModule', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('UPDATE TrainingModule SET trainingModuleId=' + data.trainingModuleId + ',' + 'trainingModuleName=' + data.trainingModuleName + ',' + 'userId=' + data.userId + ' WHERE trainingModuleId=' + data.trainingModuleId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.get('/getPedagogicalUnits', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('SELECT * FROM PedagogicalUnit;', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.get('/getPedagogicalUnitsByUser', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('SELECT * FROM PedagogicalUnit WHERE userId='+ data.userId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/createPedagogicalUnit', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('INSERT INTO PedagogicalUnit (pedagogicalUnitId, pedagogicalUnitName, userId) VALUES(' + data.pedagogicalUnitId + ',' + data.pedagogicalUnitName + ',' + data.userId + ');', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/updatePedagogicalUnit', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('UPDATE PedagogicalUnit SET pedagogicalUnitName=' + data.pedagogicalUnitName + ',' + 'userId=' + data.userId + ' WHERE pedagogicalUnitId=' + data.pedagogicalUnitId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.get('/getTrainingLevels', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('SELECT * FROM TrainingLevel;', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/createTrainingLevel', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('INSERT INTO TrainingLevel (trainingLevelId, trainingLevelName) VALUES(' + data.trainingLevelId + ',' + data.trainingLevelName + ');', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.post('/updateTrainingLevel', (req,res) => {
	let data = req.body
	console.log(req.body)
	connection.query('UPDATE TrainingLevel SET trainingLevelName=' + data.trainingLevelName + ' WHERE trainingLevelId=' + data.trainingLevelId + ';', function (error, results, fields) {
		if (error) throw error;
		console.log('le resultat de la requête est : ', results);
		res.status(200).json(results);
		});
})

app.listen(7001, () => {
	console.log('Serveur à l\'écoute')
})
