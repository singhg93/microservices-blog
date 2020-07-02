import React, { Component } from 'react';
import {
    Redirect,
} from 'react-router-dom';
import marked from 'marked';

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articleId: this.props.match.params.articleId,
            article: {
                title: 'Loading....',
                //description: 'Loading....',
                content: 'Loading.....',
                date: 'Loding...'
            }
        }

        this.deleteArticle = this.deleteArticle.bind(this);
    }

    deleteArticle = (event) => {
        event.preventDefault();

        fetch('/article/delete/' + this.state.article._id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.props.history.push('/blog');
                } else {
                    throw new Error("Request Unsuccessful");
                }
            })
            .catch( err => {
                console.log(err);
            });
    }
    componentDidMount() {
        fetch('/article/' + this.state.articleId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            if (data === null) {
                                this.props.history.push('/404');
                            } else {
                                this.setState({
                                    article: data
                                });
                            }
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        if (this.state.articleId === undefined) {
            return <Redirect to="/"/>
        }
        var contentHtml = marked(this.state.article.content);
        //var descriptionHtml = marked(this.state.article.description);
        //var htmlToDisplay = "Hello";
        return (
            <div className="container ">

                <div className="pt-5">
                    <span className="display-4 font-weight-bold text-monospace">{this.state.article.title}</span>
                </div>

                <hr/>
                <div className="delete-artilce">
                    <button className="btn btn-danger" onClick={this.deleteArticle}>Delete Article</button>
                </div>

                <div className="content py-3">
                    <div dangerouslySetInnerHTML={{__html: contentHtml}}>
                    </div>
                </div>

                <hr/>
                <span className="py-1 text-muted">Date posted: {this.state.article.date}</span>
                <div className="comments pt-4">
                    <h5 className="font-weight-bold text-monospace">Comments</h5><br/>
                    This will be comments
                </div>

            </div>
        )
    }
}

export default Article;
