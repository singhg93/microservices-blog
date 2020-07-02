import React, { Component } from 'react';

class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            post_img_url: "",
            description: "",
            content: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onPreview = this.onPreview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onPreview = (event) => {
        event.preventDefault();
        console.log("I was clicked");
    }

    onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        fetch('/article/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                post_img_url: this.state.post_img_url,
                description: this.state.description,
                content: this.state.content,
                author_id: 3
            })
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            console.log(data);
                            this.props.history.push('/blog');
                        });
                } else {
                    throw new Error("REQUEST unsuccessful");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container ">

                <form className="w-75 m-auto pb-5" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="text-weight-bold">Title</label>
                        <input
                            type="text"
                            placeholder="Give an interesting title....."
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="post_img_url" className="text-weight-bold">Image Url</label>
                        <input
                            type="text"
                            placeholder="Link to the image url...."
                            name="post_img_url"
                            value={this.state.post_img_url}
                            onChange={this.onChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="text-weight-bold">Description</label>
                        <textarea
                            placeholder="Provide some description for your article...."
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            className="form-control"
                            rows="4"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content" className="text-weight-bold">Content</label>
                        <textarea
                            placeholder="Write something interesting....."
                            name="content"
                            value={this.state.content}
                            onChange={this.onChange}
                            className="form-control"
                            rows="10"
                        />
                    </div>

                    <hr/>
                    <div className="form-row justify-content-center">
                        <input
                            type="submit"
                            className="btn btn-info w-50 m-1"
                            value="Post"
                        />
                    </div>
                </form>

            </div>
        )
    }
}

export default CreateArticle;

