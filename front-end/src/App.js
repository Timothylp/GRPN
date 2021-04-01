import React from "react"
import './App.css'
import {
  BrowserRouter,
  Link,
  Route,
} from "react-router-dom"

import Header from './sections/Header'
import Footer from "./sections/Footer"

import Login from './pages/Login'
import Message from './pages/Message'
import User from './pages/User'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: this.getToken()
    };
  }

  setToken(token) {
    this.setState({ token: token })
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }
  
  logout(){
    this.setState({ token: null })
  }

  render() {
    if (!this.state.token) {
      return <div>
        <Header />
        <main>
          <section className="py-5 bg-light">
            <div className="container">
              <Login setToken={this.setToken.bind(this)} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    }

    return <div>
      <Header />
      <main>
        <section className="py-5 bg-light">
          <div className="container">
            <BrowserRouter>
              <div className="row">
                <div className="col-2">
                  <div className="vertical-nav bg-white">
                    <ul className="nav flex-column bg-white mb-0">
                      <li className="nav-item">
                        <Link className="nav-link text-dark font-italic" to="/"><i className="fas fa-home"></i> Accueil</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-dark font-italic" to="/messages"><i className="fas fa-envelope"></i> Messages</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link text-dark font-italic" to="/users"><i className="fas fa-user"></i> Utilisateurs</Link>
                      </li>
                      <li className="nav-item">
                        <a href="/#" onClick={() => { if (window.confirm('Etes-vous sûr de vouloir vous deconnecter ?')) this.logout() }} className="nav-link text-dark font-italic"><i class="fas fa-sign-out-alt"></i> Se deconnecter</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-9 offset-1">
                  <Route exact path="/messages" component={Message} />
                  <Route exact path="/users" component={User} />
                </div>
              </div>
            </BrowserRouter>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  }
}

export default App;
