import React from "react";

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            messages: null
        };

        this.fetchGetMessages = this.fetchGetMessages.bind(this);
        this.fetchDeleteMessage = this.fetchDeleteMessage.bind(this);
    };

    componentDidMount() {
        this.fetchGetMessages()
    }

    fetchGetMessages() {
        let monAPI = "http://localhost:7029/get" + this.props.type + "Messages/1";

        fetch(monAPI)
            .then(response => response.json())
            .then(response => this.setState({ messages: response }))
            .catch(err => console.error(err))
    }

    fetchDeleteMessage(messageId) {
        let data = {
            messageId: messageId
        }

        fetch("http://localhost:7029/deleteMessage", {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(res => res.text())
            .catch(err => console.error(err))
    }

    render() {
        if (this.state.messages != null) {
            if (this.props.type === "Received") {
                return (
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="w-25" scope="col">De</th>
                                    <th className="w-50" scope="col">Objet</th>
                                    <th scope="col">Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.messages.map((m, midx) => {
                                    return (<tr key={midx}>
                                        <td>{this.state.users[m.senderId][1]}</td>
                                        <td>{m.messageObject}</td>
                                        <td>{m.sendingDate}</td>
                                        <td><button onClick={() => { if (window.confirm('Etes-vous sûr de vouloir supprimer le message ?')) this.fetchDeleteMessage(m._id) }} className="btn btn-secondary btn-sm"><i className="fas fa-trash-alt"></i></button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            } else if (this.props.type === "Sent") {
                return (
                    <div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="w-25" scope="col">A</th>
                                    <th className="w-50" scope="col">Objet</th>
                                    <th scope="col">Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.messages.map((m, midx) => {
                                    return (<tr key={midx}>
                                        <td>{m.receveirsId.map((r, ridx) => { return (ridx ? ", " : "") + this.state.users[r][1] })}</td>
                                        <td>{m.messageObject}</td>
                                        <td>{m.sendingDate}</td>
                                        <td><button onClick={() => { if (window.confirm('Etes-vous sûr de vouloir supprimer le message ?')) this.fetchDeleteMessage(m._id) }} className="btn btn-secondary btn-sm"><i className="fas fa-trash-alt"></i></button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            }
        } else {
            return (<div></div>);
        }
    }
};

export default MessageList;