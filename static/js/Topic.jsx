import React from 'react';

export class Topic extends React.Component {
    render() {
        return (
            <div className="topic-box">
                <h3>{this.props.headline}</h3>
                <div>
                    <p>
                        {this.props.summary}
                    </p>
                </div>
            </div>         
        );
    }
}