import React, { Component } from 'react';
//import './App.css';
import getCookieByName from './utility/getCookie.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Blog from './components/Blog';
import About from './components/About';
import Register from './components/Register';
import Verify from './components/Verify';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: ""
        }

        this.logout = this.logout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        const csrf_access_token = getCookieByName('csrf_access_token');
        fetch ('/validate_token', {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': csrf_access_token
            }
        })
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {

                            this.setState({
                                loggedIn: data.ok,
                                username: data.logged_in_as
                            })
                        });
                } else {

                    this.setState({ loggedIn: false, username: "" });
                }
            })
            .catch (err => {
                console.error(err);
                this.setState({ loggedIn: false, username: "" });
            });
    }

    handleLogin = (username) => {
        this.setState({
            loggedIn: true,
            username: username
        });
    }

    logout = (event) => {
        event.preventDefault();
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res=> {
                if (res.status === 200) {
                    this.setState({
                        loggedIn: false,
                        username: ""
                    });
                } else {
                    console.log("Logout Error");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar logout={this.logout} username={this.state.username} loggedIn={this.state.loggedIn}/>
                    <div className="container">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/blog">
                                <Blog />
                            </Route>
                            <Route exact path="/about">
                                <About />
                            </Route>
                            <Route exact path="/login" render ={(props) => <Login {...props} loggedIn={this.state.loggedIn} handleLogin={this.handleLogin} />} />
                            <Route exact path="/register" render ={(props) => <Register {...props} /> }/>
                            <Route exact path="/success" render= { (props) => <Verify {...props} />} />
                        </Switch>
                    </div>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
