import React, { Component } from 'react';
//import './App.css';
import getCookieByName from './utility/getCookie.js';
import Navbar from './components/Navbar';
//import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Blog from './components/Blog';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import About from './components/About';
import Register from './components/Register';
import Verify from './components/Verify';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/authContext';
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
            username: "",
            avatar: ""
        }

        this.logout = this.logout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        const csrf_access_token = getCookieByName('csrf_access_token');
        fetch ('/auth/validate_token', {
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
                                username: data.logged_in_as,
                                avatar: data.avatar
                            })
                        });
                } else {

                    this.setState({ loggedIn: false, username: "", avatar:"" });
                }
            })
            .catch (err => {
                console.error(err);
                this.setState({ loggedIn: false, username: "", avatar:"" });
            });
    }

    handleLogin = (logged_in_as, avatar) => {
        this.setState({
            loggedIn: true,
            username: logged_in_as,
            avatar: avatar
        });
    }

    logout = (event) => {
        event.preventDefault();
        fetch("/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res=> {
                if (res.status === 200) {
                    this.setState({
                        loggedIn: false,
                        username: "",
                        avatar: ""
                    });
                    window.location.replace('/');
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
                <AuthContext.Provider value={this.state}>
                    <Router>
                        <Navbar logout={this.logout} username={this.state.username} avatar={this.state.avatar} loggedIn={this.state.loggedIn}/>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" render = {(props) => <Home {...props} />} />
                                <Route exact path="/blog" render ={(props) => <Blog {...props}/>} />
                                <Route exact path="/about" render={(props) => <About {...props}/>} />
                                <Route exact path="/login" render ={(props) => <Login {...props} loggedIn={this.state.loggedIn} handleLogin={this.handleLogin} />} />
                                <Route exact path="/register" render ={(props) => <Register {...props} /> }/>
                                <Route path="/verify" render= { (props) => <Verify {...props} />} >
                                    <Route path="/:email_code" render = { (props) => <Verify {...props} /> }> </Route>
                                </Route>
                                {/*<Route exact path="/profile" render= { (props) => <Profile {...props} avatar={this.state.avatar} />} />*/}
                                <PrivateRoute path="/profile" component={Profile} />
                                <Route path="/article/:articleId" render ={(props) => <Article {...props} /> } />
                                <Route exact path="/create" render ={(props) => <CreateArticle {...props} /> }/>
                            </Switch>
                        </div>
                    </Router>
                </AuthContext.Provider>
            </div>
        );
    }
}

export default App;
