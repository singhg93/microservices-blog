import React, { Component } from 'react';
//import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Blog from './components/Blog';
import About from './components/About';
import Register from './components/Register';
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
            username: "Nil"
        }

        this.logout = this.logout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = (username) => {
        this.setState({
            loggedIn: true,
            username: username
        });
    }

    logout = (event) => {
        event.preventDefault();
        console.log("I am clicked");
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
                            <Route exact path="/login" render ={(props) => <Login {...props} handleLogin={this.handleLogin} />} />
                            <Route exact path="/register">
                                <Register />
                            </Route>
                        </Switch>
                    </div>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
