import React from 'react';
import { Article } from './Article';

import { Panel } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

export class Story extends React.Component {    
    render() {
        var articles = this.props.articles.map(article => {
            return (
                <Article headline={article.headline}
                    summary={article.summary}
                    stance={article.stance}
                    url={article.url}
                />)
        });

        return (
            <Panel className="container">
                <h2>{this.props.topic}</h2>
                <p>
                    {this.props.summary}
                </p>
                <ListGroup>
                    {articles}
                </ListGroup>
            </Panel>
        );
    }
}