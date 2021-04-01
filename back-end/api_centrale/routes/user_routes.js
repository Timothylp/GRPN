module.exports = function (app, fetch) {
    app.get('/getUsers', (req, res) => {
        fetch('http://localhost:7001/getUsers/')
            .then(res => res.json())
            .then(response => {
                return res.send(response);
            })
            .catch(err => console.error(err))

        /*var data = JSON.stringify(
            [
                {
                    "userId": 0,
                    "userLastName": "Celton",
                    "userFirstName": "Mael",
                },
                {
                    "userId": 1,
                    "userLastName": "Le Pallec",
                    "userFirstName": "Timothy",
                },
                {
                    "userId": 2,
                    "userLastName": "Trefouel",
                    "userFirstName": "Anaelle",
                },
                {
                    "userId": 3,
                    "userLastName": "Abjean",
                    "userFirstName": "Nils",
                },
            ]
        )

        return res.send(data)*/
    })

    app.post('/createUser', (req, res) => {

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
            redirect: 'follow'
        };

        fetch("http://localhost:7001/createUser", requestOptions)
            .then(res => res.json())
            .then(response => {
                return res.send(response);
            })
            .catch(error => console.log('error', error));
    })

    app.delete('/deleteUser', (req, res) => {
        var requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
            redirect: 'follow'
        };

        fetch("http://localhost:7001/deleteUser", requestOptions)
            .then(res => res.json())
            .then(response => {
                return res.send(response);
            })
            .catch(error => console.log('error', error));
    })

    app.post('/login', (req, res) => {
        var username = req.body.username
        var password = req.body.password

        var data = JSON.stringify({ "isAuthenticated": true, "token": "tokenAdmin"})

        if (username === "admin" && password === "admin") {
            return res.send(data);
        } else {
            data = JSON.stringify({ "isAuthenticated": false, "token": null})
            return res.send(data);
        }

        /*var data = JSON.stringify({
            "userLastName": req.body.username, "userPassword": req.body.password
        });
    
        var requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: data,
            redirect: 'follow'
        };
    
        fetch("http://obiwan2.univ-brest.fr:7001/isUserExist/", requestOptions)
            .then(res => res.json())
            .then(response => {
                return res.send(response);
            })
            .catch(error => console.log('error', error));*/

    })
}