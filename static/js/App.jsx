import React from 'react';

import { Loading } from './Loading';
import { Story } from './Story';

import { Alert } from 'react-bootstrap';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = '/mock-response';
        this.state = {
            loading: true,
            topics: null
        }

        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // GET mock json data, when it comes back put it into state.
        fetch(this.jsonUrl).then(res => {
            res.json().then(data =>
                this.setState({ loading: false, topics: data.topics })
            );
        });
    }

    render() {
        // Display a loading screen until the json data comes back from server
        if (this.state.loading) return <Loading />;
        
        var stories = this.state.topics.map(story => {
            return (
                <Story topic={story.story}
                    summary={story.summary}
                    articles={story.articles} />)
        })

        return (
            <div className="container">
                <h1>Burst Your Bubble</h1>
                <div>
                    <Alert bsStyle="success">
                        <strong>Holy guacamole!</strong> Bootstrap components are working!
                    </Alert>
                </div>
                <div>
                    {stories}
                </div>
            </div>
        );
    }
}
