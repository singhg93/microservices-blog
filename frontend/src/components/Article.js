import React, { Component } from 'react';
import marked from 'marked';

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "# Heading1\n\n## heading2\n\nParagraph",
        }
    }
    render() {
        var htmlToDisplay = marked(this.state.message);
        return (
            <div className="container ">

                <div className="pt-5">
                    <span className="display-2 font-weight-bold text-monospace">This is a heading</span>
                </div>

                <hr/>
                <div className="content py-3">
                    <span className="display-4 font-weight-bold text-monospace">Content</span><br/>
                    <div dangerouslySetInnerHTML={{__html: htmlToDisplay}}>
                    </div>
                </div>

                <hr/>
                <div className="comments pt-4">
                    <span className="display-4 font-weight-bold text-monospace">Comments</span><br/>
                    This will be comments
                </div>

            </div>
        )
    }
}

export default Article;
