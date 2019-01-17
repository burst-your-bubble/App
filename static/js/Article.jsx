import React from 'react';

import { Media } from 'react-bootstrap';

export class Article extends React.Component {
    render() {
        return (
            <div>
                <Media>
                    <Media.Left align="top">
                        <img width={64} height={64} src="../../assets/thumbnail.png" alt="thumbnail" />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading><a href={this.props.url} target="_blank">{this.props.headline}</a></Media.Heading>
                        <p>
                            {this.props.summary} - {this.props.stance}
                        </p>
                    </Media.Body>
                </Media>
            </div>

        );
    }
}