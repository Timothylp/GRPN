import React from "react";
import logo from '../logo.png';

class Header extends React.Component {
    render() {
        return <header>
            <div className="py-5 text-center">
                <img className="d-block mx-auto mb-4" src={logo} alt="" width="72" height="72" />
                <h2>G.R.P.N</h2>
                <p className="lead">Application de Gestion Ressources Pédagogiques Numériques.</p>
            </div>
        </header>
    }
}

export default Header;