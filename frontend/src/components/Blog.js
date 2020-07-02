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
                            console.log(data);
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
        
        const articleList = this.state.articles.map(article => {
            const articleUrl = "/article/" + article._id;
            return (
                <div key={article._id} className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <Link to={articleUrl}>
                                <img className="img-fluid rounded" src={article.post_img_url} alt=""/>
                                </Link>
                            </div>
                            <div className="col-lg-6">
                                <h2 className="card-title">{article.title}</h2>
                                <p className="card-text">{article.description}</p>
                                <Link to={articleUrl}>Read More &rarr;</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        Posted on January 1, 2017 by
                        <Link to="/">Start Bootstrap</Link>
                    </div>
                </div>
            )
        });
        return (
            <div>

                {/*<!-- Page Heading/Breadcrumbs -->*/}
                <h1 className="mt-4 mb-3">Recent posts</h1>

                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Blog</li>
                </ol>

                { /*<!-- Blog Post -->*/ }
                
                {articleList}

                


                { /*<!-- Pagination -->*/ }
                <ul className="pagination justify-content-center mb-4">
                    <li className="page-item">
                        <Link className="page-link" to="/">&larr; Older</Link>
                    </li>
                    <li className="page-item disabled">
                        <Link className="page-link" to="/">Newer &rarr;</Link>
                    </li>
                </ul>


                {/*<div className="container pt-5">
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
                                                                                                                                </div>*/}
            </div>
        );
    }
}

export default Blog;
