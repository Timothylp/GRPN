import React from 'react';
import PropTypes from 'prop-types';
import AuthenticationService from '../services/authentication-service';

import { Field } from '../components/Functions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: 'Vous êtes déconnecté.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.setState({ [fieldName]: fieldValue });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username.length && this.state.password.length) {
      this.setState({ message: '👉 Tentative de connexion en cours ...' });
      AuthenticationService.login(this.state.username, this.state.password).then(isAuthenticated => {
        if (!isAuthenticated) {
          this.setState({ message: '🔐 Identifiant ou mot de passe incorrect.' });
          return;
        }
        this.props.setToken(AuthenticationService.token)
      });
    }
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {this.state.message && <div className="form-group">
                <div className="card-text grey">
                  {this.state.message}
                </div>
              </div>}
              <Field name="username" type="text" value={this.state.username} onChange={this.handleChange}>Identifiant</Field>
              <Field name="password" type="password" value={this.state.password} onChange={this.handleChange}>Mot de passe</Field>
              <div className="mt-2 text-end">
                <button type="submit" className="btn btn-secondary">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form >
  }
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;