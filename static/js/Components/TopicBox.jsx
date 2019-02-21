import React from 'react';
import { ArticleBox } from './ArticleBox';
import { sortArticles } from '../lib/articleSort';

import { Panel } from 'react-bootstrap';

export class TopicBox extends React.Component {
    render() {
        var sorted = sortArticles(this.props.score, this.props.articles)
        var articles = sorted.map(article => {
            return (
                <ArticleBox title={article.title}
                    summary={article.summary}
                    stance={article.stance}
                    url={article.url}
                    id={article.id}
                    read={article.read}
                    response={article.response}
                />)
        });
        return (
            <Panel id="story-box" defaultExpanded={false}>
                <Panel.Heading>
                    <Panel.Title style={{fontFamily: 'Avenir Next-DemiBold', fontWeight: 'Demi Bold'}} componentClass="span">{this.props.topic}</Panel.Title>
                    <Panel.Body>
                        <div style={{float: 'right'}}>
                            <Panel.Toggle><i className="fas fa-caret-down"></i></Panel.Toggle>
                        </div>
                    </Panel.Body>   
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