import React from 'react';
import { ArticleBox } from './ArticleBox';

import { Panel } from 'react-bootstrap';

export class TopicBox extends React.Component {
    render() {
        var articles = this.props.articles.map(article => {
            return (
                <ArticleBox headline={article.headline}
                    summary={article.summary}
                    stance={article.stance}
                    url={article.url}
                />)
        });

        return (
            <Panel id="story-box" defaultExpanded>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{this.props.topic}</Panel.Title>
                    <Panel.Body>{this.props.summary}</Panel.Body>
                    <Panel.Toggle componentClass="a">Read More...</Panel.Toggle>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        {articles}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}