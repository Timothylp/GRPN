import React from "react";

import { Field, TextArea, Select } from "./Functions";

class MessagePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            object: '',
            id: [],
            selectValues: this.props.users
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

        if (this.state.value !== '' && this.state.id.length) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let data = JSON.stringify({
                "value": this.state.value,
                "object": this.state.object,
                "id": this.state.id
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: data,
                redirect: 'follow'
            };

            fetch("http://localhost:7029/createMessage", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

            this.setState ({
                value: '',
                object: '',
                id: [],
                selectValues: this.props.users
            });
        }
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <Select name="id" value={this.state.id} onChange={this.handleChange} options={this.state.selectValues}>Destinataires</Select>
            <Field name="object" value={this.state.object} onChange={this.handleChange}>Objet</Field>
            <TextArea name="value" value={this.state.value} onChange={this.handleChange}>Message</TextArea>
            <div className="form-group mt-2 float-end">
                <button className="btn btn-secondary">Envoyer <i className="far fa-paper-plane"></i> </button>
            </div>
        </form>
    }
}

export default MessagePost;
