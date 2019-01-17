import React from 'react';

//export const Article = ({ match }) => <h1>This is the article page! This is article {match.params.id}</h1>;

export class Article extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        // fetch actual article data from server based on article id
    }

    render() {
        return <h1>Article Page! This is article {this.id}</h1>;
    }
}