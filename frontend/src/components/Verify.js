import React, { Component } from "react";

class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: ""

        }

        this.onClick = this.onClick.bind(this)
    }

    onClick = (event) => {
        event.preventDefault();
        fetch("/resend/" + this.state.email, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        message: "The link has been sent to your email. Please follow the link to verify your account"
                    });
                } else {
                    this.setState({
                        message: "If there is an account associated with your email, a link will be sent to your email"
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentDidMount() {
        if ( !this.props.location.state ) {
            this.props.history.push('/');
        } else {
            this.setState({
                email: this.props.location.state.email,
                message: "Please follow the link sent to your email to verify your account"
            });
        }
    }
    render() {
        return (
            <div > 
                <div className="pt-5 row justify-content-center">
                    <div className="col">
                        <div className="alert alert-primary text-center">
                            {this.state.message} <br/>
                            Did not receive the email? 
                            <button className="btn btn-info" onClick={this.onClick}>Resend</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Verify;
