import React from 'react';
import { ArticleBox } from './ArticleBox';
import { sortArticles } from '../lib/articleSort';

import { Panel } from 'react-bootstrap';

export class TopicBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        console.log(this.props.score);
        var sorted = sortArticles(this.props.score, this.props.articles);
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
            <Panel id="story-box" expanded={this.state.expanded}>
                <Panel.Heading onClick={this.handleClick} className="topic-box">
                    <Panel.Title style={{ fontFamily: 'Avenir Next-DemiBold' }} componentClass="span">
                        {this.props.topic}
                    </Panel.Title>
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