import React from "react";
class Navbar extends React.Component {
    render() {
        return <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" href="/messages">Messages</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">Se deconnecter</a>
            </li>
        </ul>
    }
}

export default Navbar;