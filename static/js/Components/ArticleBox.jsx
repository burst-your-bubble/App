import React from 'react';

import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ArticleBox extends React.Component {
    constructor(props) {
        super(props);
        this.url = `/article/${this.props.id}`;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        sessionStorage.setItem('opentopic', this.props.topicID);
    }

    render() {
        var style = {color: '#3285F4'};
        var circleClass = "fas fa-circle";

        if(this.props.read == true){
            circleClass = "far fa-circle"
            if(this.props.response == 1)
                style = {color: "#5cb85c"};
            else if (this.props.response == 0)
                style = {color: "#f0ad4e"};
            else
                style = {color: "#d9534f"};
        }
        
        return (
            <div>
                <Media className={this.props.read? 'greyed-out':''}>
                    <Media.Left align="top" >
                        <i className={circleClass} style={style}></i>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading><Link className="article-box-title" to={this.url} onClick={this.handleClick}>{this.props.title}</Link></Media.Heading>
                        <p>
                            {this.props.summary}
                        </p>
                    </Media.Body>
                </Media>
            </div>

        );
    }
}