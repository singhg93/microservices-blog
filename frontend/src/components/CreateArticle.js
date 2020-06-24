import React, { Component } from 'react';

class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            content: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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

                    <hr/>
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

