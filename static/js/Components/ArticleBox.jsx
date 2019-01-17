import React from 'react';

import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ArticleBox extends React.Component {
    render() {
        return (
            <div>
                <Media>
                    <Media.Left align="top">
                        <img width={64} height={64} src="../../assets/thumbnail.png" alt="thumbnail" />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading><Link to="/article">{this.props.headline}</Link></Media.Heading>
                        <p>
                            {this.props.summary} - {this.props.stance}
                        </p>
                    </Media.Body>
                </Media>
            </div>

        );
    }
}