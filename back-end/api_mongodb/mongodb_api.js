const express = require('express')
const app = express()

/**
 * Import MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
//const url = 'mongodb://obiwan2.univ-brest.fr:27017';
const url = 'mongodb+srv://timothylp:LePallec_56@go-fullstack.tfbkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dbName = 'M1_Le_Pallec_Timothy_grpn'
let db
 
MongoClient.connect(url, function(err, client) {
    if(err) {
        console.log(err)
    }
    console.log("Connected successfully to server")
    db = client.db(dbName)
});

app.use(express.json())

app.get('/getMessages', (req,res) => {
    db.collection('Message').find({}).toArray(function(err, result) {
        if (err) {
            res.status(500).json(err)
        }
        res.status(200).json(result)
    })
})

app.get('/getMessagesBySender/:senderId', (req,res) => {
    const senderIdQuery = req.params.senderId
    var query = { senderId: senderIdQuery }
    var sort = { _id: -1}
    
    db.collection('Message').find(query).sort(sort).toArray(function(err, result) {
        if (err) {
            res.status(500).json(err)
        }
        res.status(200).json(result)
    })
})

app.get('/getMessagesByReceiver/:receiverId', (req,res) => {
    const receiverIdQuery = req.params.receiverId

    var query = { receveirsId : receiverIdQuery }

    db.collection('Message').find(query).toArray(function(err, result) {
        if (err) {
            res.status(500).json(err)
        }
        res.status(200).json(result)
    })
})

app.post('/createMessage', (req, res) => {
    db.collection('Message').insertOne(req.body, function(err, obj) {
        if(err) {
            res.status(500).json
        } else {
            res.status(200).json()
        }
    })
})

app.delete('/deleteMessage', (req, res) => {
    
    const messageIdQuery = req.body.messageId
    var query = { "_id" : ObjectId(messageIdQuery) }

    db.collection('Message').deleteOne(query, function(err, obj) {
        if(err) {
            res.status(500).json
        } else {
            res.status(200).json()
        }
    })
})

app.listen(7002, () => {
    console.log("Serveur à l'écoute")
})