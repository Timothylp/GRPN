import React from "react";

import MessagePost from '../components/MessagePost';
import MessageList from '../components/MessageList';

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.receivedMessages = React.createRef();
        this.sentMessages = React.createRef();
        this.state = {
            users: []
        };

        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let monAPI = "http://localhost:7029/getUsers";

        let results = this.state.users;

        fetch(monAPI)
            .then(response => response.json())
            .then(response => response.map(function (value, index) {
                return results.push([value.userId, value.userLastName + ' ' + value.userFirstName])
            }))
            .catch(err => console.error(err))

        this.setState({ users: results });
    }

    refresh() {
        this.sentMessages.current.fetchGetMessages()
        this.receivedMessages.current.fetchGetMessages()
    }

    render() {
        return <div>
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="received-tab" data-bs-toggle="tab" data-bs-target="#received" type="button" role="tab" aria-controls="received" aria-selected="true">Messages reçus</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="sent-tab" data-bs-toggle="tab" data-bs-target="#sent" type="button" role="tab" aria-controls="sent" aria-selected="false">Messages envoyés</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="post-tab" data-bs-toggle="tab" data-bs-target="#post" type="button" role="tab" aria-controls="post" aria-selected="false">Envoyer un message</button>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="received" role="tabpanel" aria-labelledby="received-tab">
                    <div className="row">
                        <div className="col align-self-start">
                            <h3>Messages reçus</h3>
                        </div>
                        <div className="col align-self-end">
                            <button onClick={this.refresh} type="button" className="btn btn-outline-secondary float-end"><i className="fas fa-sync-alt"></i> Rafraîchir</button>
                        </div>
                    </div>
                    <MessageList type="Received" ref={this.receivedMessages} users={this.state.users} />
                </div>
                <div className="tab-pane fade" id="sent" role="tabpanel" aria-labelledby="sent-tab">
                <div className="row">
                        <div className="col align-self-start">
                            <h3>Messages envoyés</h3>
                        </div>
                        <div className="col align-self-end">
                            <button onClick={this.refresh} type="button" className="btn btn-outline-secondary float-end"><i className="fas fa-sync-alt"></i> Rafraîchir</button>
                        </div>
                    </div>
                    <MessageList type="Sent" ref={this.sentMessages} users={this.state.users} />
                </div>
                <div className="tab-pane fade" id="post" role="tabpanel" aria-labelledby="post-tab">
                    <h3>Envoyer un message</h3>
                    <MessagePost users={this.state.users} />
                </div>
            </div>
        </div >
    }
};

export default Message;