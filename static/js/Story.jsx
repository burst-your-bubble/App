import React from 'react';
import { Article } from './Article';

export class Story extends React.Component {    
    render() {
        var articles = this.props.articles.map(article => {
            return (
                <Article headline={article.headline}
                    summary={article.summary}
                    stance={article.stance}
                    url={article.url}
                />)
        })

        return (
            <div className="story-box">
                <h2>{this.props.topic}</h2>
                <p>
                    {this.props.summary}
                    {articles}
                </p>
            </div>
        );
    }
}