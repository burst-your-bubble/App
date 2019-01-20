import React from 'react';

import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ArticleBox extends React.Component {
    render() {
        let url = `/article/${this.props.id}`;
        return (
            <div>
                <Media>
                    <Media.Left align="top">
                        <i className="fas fa-circle blue"></i>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading><Link to={url}>{this.props.title}</Link></Media.Heading>
                        <p>
                            {this.props.summary} - {this.props.stance}
                        </p>
                    </Media.Body>
                </Media>
            </div>

        );
    }
}