import React from 'react';

import { ListGroupItem } from 'react-bootstrap';

export class Article extends React.Component {
    render() {
        return (
            <ListGroupItem>
                <h4><a href={this.props.url} target="_blank">{this.props.headline}</a></h4>
                <p>
                        {this.props.summary} - {this.props.stance}
                </p>
            </ListGroupItem>);
    }
}