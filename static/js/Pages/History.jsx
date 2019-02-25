import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { Loading } from '../Components/Loading';
import { ArticleBox } from '../Components/ArticleBox';

export class History extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = `/api/history`;

        this.state = {
            loading: true,
            history: null,
            user_score: null,
            userID: null,
        }

        this.componentDidMount.bind(this);

    }

    componentDidMount() {
        // fetch actual history data from server based on user id
        fetch(this.jsonUrl).then(result => {
            result.json().then(data =>
                this.setState({ loading: false, history: data.history, user_score: data.score, userID: data.userID }))
        });
    }

    render() {
        if (this.state.loading) return <Loading />;
        var articles;

        for (var i = 0; i < this.state.history.length; i++) {
            console.log(this.state.history[i].details.id);
            console.log(this.state.history[i].details.title);
            console.log(this.state.history[i].details.summary);
            console.log(this.state.history[i].response);
        }

        return (
            <div className="container">
                <PageHeader className="homeTitle">
                    <span style={{ fontFamily: 'Avenir Next' }}>User History for {this.state.userID}</span>
                </PageHeader>
                <Panel.Body>
                    {articles}
                </Panel.Body>
            </div>
        );
    }

}