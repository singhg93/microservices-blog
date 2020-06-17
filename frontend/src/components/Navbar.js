import React, { Component } from "react";
import '../utility/css/Navbar.css';
import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    NavLink
} from "react-router-dom";

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink to="/blog" exact className="navbar-brand">Blog</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" exact activeClassName="active" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" exact activeClassName="active" className="nav-link">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/blog" exact activeClassName="active" className="nav-link">Blog</NavLink>
                        </li>
                        {
                            this.props.loggedIn ?
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle dropdown-btn"  id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={this.props.avatar} width="30" alt={this.props.username}/></button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <span className="dropdown-item logout-btn">{this.props.username}</span>
                                        <NavLink to="/profile" className="dropdown-item" >Profile</NavLink>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item logout-btn" onClick={this.props.logout}>Logout</button>
                                    </div>
                                </li>
                                :
                                <li className="nav-item">
                                    <NavLink to="/login" exact activeClassName="active" className="nav-link">Login</NavLink>
                                </li>
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
