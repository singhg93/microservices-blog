import React, { Component } from "react";
import '../utility/css/Navbar.css';

class Footer extends Component {

    render() {
        return (
            <nav className="navbar fixed-bottom navbar-dark bg-dark">
              <span className="navbar-brand" >Fixed bottom</span>
            </nav>
        );
    }
}

export default Footer;
