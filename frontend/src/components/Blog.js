import React, { Component } from "react";

class Blog extends Component {

    componentDidMount() {
        fetch('/article/all')
    }
    render() {
        return (
            <h1>Blog</h1>
        );
    }
}

export default Blog;
