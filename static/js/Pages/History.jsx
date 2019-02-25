import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';
import { Loading } from '../Components/Loading';
import { ArticleBox } from '../Components/ArticleBox';
import { Article } from './Article';

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

        var articles = this.state.history.map(article => {
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