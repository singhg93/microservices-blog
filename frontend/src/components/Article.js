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
                description: 'Loading....',
                content: 'Loading.....'
            }
        }
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
                            console.log(data);
                            this.setState({
                                article: data
                            });
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
        var descriptionHtml = marked(this.state.article.description);
        //var htmlToDisplay = "Hello";
        return (
            <div className="container ">

                <div className="pt-5">
                    <span className="display-4 font-weight-bold text-monospace">{this.state.article.title}</span>
                </div>

                <hr/>
                { this.state.description !== "" ?
                    <div>
                        <div className="pt-5">
                            <h5 className="font-weight-bold text-monospace">Abstract</h5>
                            <div dangerouslySetInnerHTML={{__html: descriptionHtml}}>
                            </div>
                        </div>
                        <hr/>
                    </div>

                : <br/>
                }
                <div className="content py-3">
                    <div dangerouslySetInnerHTML={{__html: contentHtml}}>
                    </div>
                </div>

                <hr/>
                <div className="comments pt-4">
                    <h5 className="font-weight-bold text-monospace">Comments</h5><br/>
                    This will be comments
                </div>

            </div>
        )
    }
}

export default Article;
