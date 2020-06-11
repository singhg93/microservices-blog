import React, { Component } from "react";
import {
    Link
} from "react-router-dom";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password1: "",
            password2: "",
            passwordError: "",
            pwdErr: ""

        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.password1.length < 8) {
            this.setState( {
                pwdErr: "The password must contain atleast 8 characters"
            });
        } else if ( !this.state.password1.match(/[0-9]+/)) {
            this.setState({
                pwdErr: "The password must contain at least one numeric character"
            });
        } else if ( !this.state.password1.match(/(?=.*[a-z])(?=.*[A-Z])/)) {
            this.setState({
                pwdErr: "The password must contain at least one lowercase and one upercase character"
            });
        } else if ( !this.state.password1.match(/[@$!%*?&]+/)) {
            this.setState({
                pwdErr: "The password must contain at least one special character"
            });
        } else {
            this.setState({

                pwdErr: ""
            });
        }

        if (this.state.password1 !== this.state.password2) {
            this.setState({
                passwordError: "The password doesn't match"
            });
            return;
        } else {
            this.setState({
                passwordError: ""
            })
        }

        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password1
            })
        })
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log(data);
                        })
                        .catch(error => {
                            console.log(error);
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
                        <h1 className="text-center">Register</h1>
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
                                    placeholder="Enter a password...."
                                    name="password1"
                                    value={this.state.password1}
                                    onChange={this.onChange}
                                    className="form-control"
                                />
                                <span className="text-danger">{this.state.pwdErr}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password text-weight-bold">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Re-Enter the password...."
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    className="form-control"
                                />
                                <span className="text-danger">{this.state.passwordError}</span>
                            </div>
                            <div className="form-row justify-content-center">
                                <input
                                    type="submit"
                                    className="btn btn-info w-100 m-1"
                                    value="Register"
                                />
                            </div>
                            <span className="form-text">Already have an account? <Link to="/login" >Login</Link></span>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
