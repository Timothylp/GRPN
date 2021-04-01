import React from "react";

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
        };

        this.fetchGetUsers = this.fetchGetUsers.bind(this)
        this.fetchDeleteUsers= this.fetchDeleteUser.bind(this)
    };

    componentDidMount() {
        this.fetchGetUsers()
    }

    fetchGetUsers() {
        let monAPI = "http://localhost:7029/getUsers";

        fetch(monAPI)
            .then(response => response.json())
            .then(response => this.setState({ users: response }))
            .catch(err => console.error(err))
    }

    fetchDeleteUser(userId){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let monAPI = "http://localhost:7029/deleteUser";

        let data = {
            "userId": userId
        }

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        fetch(monAPI, requestOptions)
            .then(response => response.json())
            .catch(err => console.error(err))
    }

    render() {
        if (this.state.users != null) {
                return (
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prénom</th>
                                    <th scope="col">Admin ?</th>
                                    <th scope="col">institutionId</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((u, idx) => {
                                    return (<tr key={idx}>
                                        <td>{u.userId}</td>
                                        <td>{u.userLastName}</td>
                                        <td>{u.userFirstName}</td>
                                        <td>{u.isAdmin}</td>
                                        <td>{u.institutionId}</td>
                                        <td><button onClick={() => { if (window.confirm('Etes-vous sûr de vouloir supprimer l\'utilisateur ?')) this.fetchDeleteUser(u.userId) }} className="btn btn-secondary btn-sm"><i className="fas fa-trash-alt"></i></button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                );
        } else {
            return (<div></div>);
        }
    }
};

export default UsersList;