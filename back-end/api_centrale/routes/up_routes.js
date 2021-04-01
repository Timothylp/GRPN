module.exports = function(app,fetch) {
    app.get('/getPedagogicalUnits', (req, res) => {

        fetch(`http://obiwan2.univ-brest.fr:7001/getPedagogicalUnits`)
            .then(response => response.json())
            .then(response => {
                return res.send(response);
            })
            .catch(err => console.error(err))
    });

    app.post('/getPedagogicalUnitsByUser', (req, res) => {
        var myHeaders = new fetch.Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "userId": req.body.userId });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://obiwan2.univ-brest.fr:7001/getPedagogicalUnitsByUser`, requestOptions)
            .then(response => response.json())
            .then(response => {
                return res.send(response);
            })
            .catch(err => console.error(err))
    });
    
    app.post('/createPedagogicalUnit', (req, res) => {
        var myHeaders = new fetch.Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "pedagogicalUnitName": req.body.pedagogicalUnitName, "userId": req.body.userId });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`http://obiwan2.univ-brest.fr:7001/createPedagogicalUnit`, requestOptions)
            .then(response => response.json())
            .then(response => {
                return res.send(response);
            })
            .catch(err => console.error(err))
    });
    
    app.post('/deletePedagogicalUnit', (req, res) => {
        var myHeaders = new fetch.Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "pedagogicalUnitId": req.body.pedagogicalUnitId });
        console.log("test" + raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`http://obiwan2.univ-brest.fr:7001/deletePedagogicalUnit`, requestOptions)
            .then(response => response.json())
            .then(response => {
                return res.send(response);
            })
            .catch(err => console.error(err))
    });
}