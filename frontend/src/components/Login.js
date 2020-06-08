import React, { Component } from "react";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }

        this.onChange = this.onChange.bind(this);
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
            <div className=" justify-content-center ">
                <h1 className="pt-5 text-center">Login</h1>
                <div className="row justify-content-center">
                    <div className="col ">
                        <input
                            type="text"
                            placeholder="Please type your email...."
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
