import React from "react";

import UsersList from '../components/UsersList';
import UserPost from '../components/UserPost';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.userList = React.createRef();
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.userList.current.fetchGetUsers()
    }

    render() {
        return <div>
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab" aria-controls="users" aria-selected="true">Utilisateurs</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="add-tab" data-bs-toggle="tab" data-bs-target="#add" type="button" role="tab" aria-controls="add" aria-selected="false">Créer un utilisateur</button>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab">
                    <div className="row">
                        <div className="col align-self-start">
                            <h3>Utilisateurs</h3>
                        </div>
                        <div className="col align-self-end">
                            <button onClick={this.refresh} type="button" className="btn btn-outline-secondary float-end"><i className="fas fa-sync-alt"></i> Rafraîchir</button>
                        </div>
                    </div>
                    <UsersList  ref={this.userList}/>
                </div>
                <div className="tab-pane fade" id="add" role="tabpanel" aria-labelledby="add-tab">
                    <div className="row">
                        <div className="col align-self-start">
                            <h3>Créer un utilisateur</h3>
                        </div>
                        <UserPost />
                    </div>
                </div>
            </div>
        </div >
    }
};

export default User;