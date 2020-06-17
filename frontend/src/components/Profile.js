import React, { Component } from 'react';

class Profile extends Component {

    componentDidMount() {
        //console.log(this.props);
    }
    render() {
        return (
            <div>
                <div className="row justify-content-center bg-secondary">
                    <div className="col py-5">
                        <img className="m-auto" src={this.props.avatar} alt="avatar"/>
                    </div>
                </div>
                <span>Name</span><br/>
                <span>email</span><br/>
                <span>total posts</span><br/>
                <span>add a new post</span><br/>
            </div>
        );
    }
}

export default Profile;
