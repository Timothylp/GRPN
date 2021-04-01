import React from "react";

import { Field } from "./Functions";

class UserPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: "0",
            institutionId: "1",
            userFirstName: '',
            userLastName: '',
            userPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const type = event.target.type;
        const value = type === 'select-multiple' ? Array.from(event.target.selectedOptions).map(o => o.value) : event.target.value
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.userFirstName !== '' && this.state.userLastName !== '' && this.state.userPassword !== '') {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let data = JSON.stringify({
                "isAdmin": this.state.isAdmin,
                "institutionId": this.state.institutionId,
                "userFirstName": this.state.userFirstName,
                "userLastName": this.state.userLastName,
                "userPassword": this.state.userPassword
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: data,
                redirect: 'follow'
            };

            fetch("http://localhost:7029/createUser", requestOptions)
                .then(response => response.text())
                .catch(error => console.log('error', error));

            this.setState({
                isAdmin: '',
                userFirstName: '',
                userLastName: '',
                userPassword: ''
            });
        }
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <Field name="userFirstName" value={this.state.userFirstName} onChange={this.handleChange}>Prénom</Field>
            <Field name="userLastName" value={this.state.userLastName} onChange={this.handleChange}>Nom</Field>
            <Field name="userPassword" value={this.state.userPassword} onChange={this.handleChange}>Mot de passe</Field>
            <div className="form-group mt-2 float-end">
                <button className="btn btn-secondary">Envoyer <i className="far fa-paper-plane"></i> </button>
            </div>
        </form>
    }
}

export default UserPost;
