import React, { Component } from "react";

class Blog extends Component {

    componentDidMount() {
        fetch('/article/all')
    }
    render() {
        return (
            <div className="container pt-5">
                <h3 className="pb-5 text-center">Recent Posts</h3>
                <ul className="list-group">
                    <li className="list-group-item justify-content-between"><img src="https://robohash.org/something?set=set3" height="50"/><span>Cras justo odio</span><img className="float-right" src="https://robohash.org/somethingElse?set=set3" height="40"/></li>
                    <li className="list-group-item justify-content-between"><img src="https://robohash.org/something?set=set3" height="50"/><span>Dapibus ac facilisis in</span><img className="float-right" src="https://robohash.org/somethingElse?set=set3" height="40"/></li>
                    <li className="list-group-item justify-content-between"><img src="https://robohash.org/something?set=set3" height="50"/><span>Morbi leo risus</span><img className="float-right" src="https://robohash.org/somethingElse?set=set3" height="40"/></li>
                    <li className="list-group-item justify-content-between"><img src="https://robohash.org/something?set=set3" height="50"/><span>Porta ac consectetur ac</span><img className="float-right" src="https://robohash.org/somethingElse?set=set3" height="40"/></li>
                    <li className="list-group-item justify-content-between"><img src="https://robohash.org/something?set=set3" height="50"/><span>Vestibulum at eros</span><img className="float-right" src="https://robohash.org/somethingElse?set=set3" height="40"/></li>
                </ul>
            </div>
        );
    }
}

export default Blog;
