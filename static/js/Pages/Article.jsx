import React from 'react';

import { Loading } from '../Components/Loading';

export class Article extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.jsonUrl = `/json/mock-article/${this.id}`;
        this.state = {
            loading: true,
            article: null
        };
    }

    componentDidMount() {
        // fetch actual article data from server based on article id
        fetch(this.jsonUrl).then(res => {
            res.json().then(article => {
                this.setState({article: article, loading: false});
            });
        });
    }

    render() {
        if (this.state.loading) return <Loading />;

        return <h1>{this.state.article.title}</h1>;
    }
}