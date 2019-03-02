import React from 'react';
import { ArticleBox } from './ArticleBox';
import { sortArticles } from '../lib/articleSort';

import { Panel } from 'react-bootstrap';

export class TopicBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.expanded
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        var sorted = sortArticles(this.props.score, this.props.articles, this.props.topicID);
        var articles = sorted.map(article => {
            return (
                <ArticleBox title={article.title}
                    summary={article.summary}
                    stance={article.stance}
                    url={article.url}
                    id={article.id}
                    read={article.read}
                    response={article.response}
                    topicID={this.props.topicID}
                />)
        });
        return (
            <div>
                <Panel id="story-box" expanded={this.state.expanded} >
                    <Panel.Heading style={{cursor: "pointer"}} onClick={this.handleClick} className="topic-box">
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
            </div>
        );
    }
}