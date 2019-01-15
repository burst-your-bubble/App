import React from 'react';

import { Topic } from './Topic';
import { Loading } from './Loading';

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
                this.setState({loading: false, topics: data.topics})
            );
        });
    }

    render() {
        // Display a loading screen until the json data comes back from server
        if (this.state.loading) return <Loading />;

        var topics = this.state.topics.map(item => {
            return <Topic headline={item.headline} summary={item.summary} />;
        });
        return (
            <div>
                <h2>Headlines</h2>
                <hr />
                <div>
                    {topics}
                </div>
            </div>
        );
    }
}