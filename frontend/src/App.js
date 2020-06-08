import React, { Component } from 'react';
//import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Blog from './components/Blog';
import About from './components/About';
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
    }

    logout = (event) => {
        event.preventDefault();
        console.log("I am clicked");
    }
    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar logout={this.logout}/>
                    <Switch>
                        <div className="container">
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/blog">
                                <Blog />
                            </Route>
                            <Route exact path="/about">
                                <About />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                        </div>
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
