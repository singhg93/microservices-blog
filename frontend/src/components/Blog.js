import React, { Component } from "react";
import {
    Link
} from 'react-router-dom';

class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        }
    }

    componentDidMount() {
        fetch('/article/all')
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            this.setState({
                                articles: data
                            });
                        });
                } else {
                    throw new Error("Request Unsuccessful");
                }
            })
            .catch(err => {
                console.log("Error");
                console.log(err);
            });
    }
    render() {
        return (
            <div className="container pt-5">
                <h3 className="pb-5 text-center">Recent Posts</h3>
                <ul className="list-group">
                    {this.state.articles.map(item =>{
                        const imageUrl = "https://robohash.org/" + item._id + "?set=set3";
                        const secondImageUrl = "https://robohash.org/" + item.title + "?set=set3";
                        const articleLink = "/article/" + item._id;
                        return (
                            <li key={item._id} className="list-group-item justify-content-between">
                                <img src={imageUrl} alt="" height="50"/>
                                <Link to={articleLink}>{item.title}</Link>
                                <img className="float-right" src={secondImageUrl} alt="" height="40"/>
                            </li>)})}
                </ul>
            </div>
        );
    }
}

export default Blog;
