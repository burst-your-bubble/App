import React from 'react';

export class Article extends React.Component {
    render() {
        return (
            <div className="article-box">
                <h4><a href={this.props.url} target="_blank">{this.props.headline}</a></h4>
                <p>
                        {this.props.summary} - {this.props.stance}
                </p>
            </div>);
    }
}