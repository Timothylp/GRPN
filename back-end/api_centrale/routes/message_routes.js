module.exports = function(app,fetch,currentUserId) {
    app.get('/getSentMessages', (req, res) => {
        fetch('http://localhost:7002/getMessagesBySender/' + currentUserId)
            .then(res => res.json())
            .then(response => {
                return res.send(response);
            })
            .catch(err => console.error(err))
    })
    
    app.get('/getReceivedMessages', (req, res) => {
        fetch('http://localhost:7002/getMessagesByReceiver/' + currentUserId)
            .then(res => res.json())
            .then(response => {
                return res.send(response);
            })
            .catch(err => console.error(err))
    })
    
    app.post('/createMessage', (req, res) => {
    
        var d = new Date()
        var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var fullDate = date +' '+ hours;
    
        let data = {
            messageObject : req.body.object,
            messageContent: req.body.value,
            senderId: currentUserId,
            receveirsId: req.body.id,
            sendingDate: fullDate
        }
    
        fetch('http://localhost:7002/createMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(res => res.text())
            .catch(err => console.error(err))
    
        res.status(200).json()
    });
    
    app.delete('/deleteMessage', (req, res) => {
        let data = {
            messageId: req.body.messageId
        }
        
        fetch('http://localhost:7002/deleteMessage', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(res => res.text())
            .catch(err => console.error(err))
    })
}