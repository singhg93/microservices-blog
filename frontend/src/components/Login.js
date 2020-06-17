import React, { Component } from "react";
import {
    NavLink
} from "react-router-dom";
import getCookieByName from '../utility/getCookie.js';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

                            this.props.history.push('/');
                        });
                }
            })
            .catch (err => {
                console.error(err);
            });
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.email === "" || this.state.password === "") {
            this.setState({
                error: "Please enter your credentials"
            });
        } else {
            this.setState({
                error: ""
            });
        }

        fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password
            })
        })
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        if (data.ok) {
                            this.props.handleLogin(data.logged_in_as, data.avatar);
                            this.props.history.push("/");
                        } else {
                            throw new Error('Login error');
                        }
                    })
                        .catch( err => {
                            this.setState({
                                error: "Login Error"
                            });
                        });
                } else {
                    res.json()
                        .then ( data => {
                            if (data.message === "Unverified Email") {
                                this.props.history.push({
                                    pathname: "/verify",
                                    state: {
                                        email: this.state.email
                                    }
                                });
                            } else {
                                this.setState({
                                    error: data.message
                                })
                            }
                        })
                        .catch (error => {
                            this.setState({
                                error: "Login error"
                            });
                        });
                }
            })

            .catch( error =>  {

            });

    }

    onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <div className="pt-5 row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-8 border rounded-lg border-info p-4 mx-2">
                        <h1 className="text-center">Login</h1>
                        <hr/>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email text-weight-bold">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email...."
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    className="form-control"
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="password text-weight-bold">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password...."
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className="form-control"
                                />
                                <span className="text-danger">{this.state.error}</span>
                                {/*<NavLink to="/recover" exact className="form-text text-right">Forgot password?</NavLink>*/}
                            </div>
                            <div className="form-row justify-content-center">
                                <input
                                    type="submit"
                                    className="btn btn-info w-100 m-1"
                                    value="Login"
                                />
                            </div>
                            <span className="form-text">Don't have an account yet? <NavLink to="/register" exact className="">Register</NavLink></span>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
