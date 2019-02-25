import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { Loading } from '../Components/Loading';

export class History extends React.Component {

    constructor(props) {
        super(props);
        var pageURL = window.location.href;
        var userID = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        
        this.jsonUrl = `/api/history/`+userID;

        this.state = {
            loading: true,
            history: null,
            user_score: null,
            userID: userID,
        }

        this.componentDidMount.bind(this);

    }

    componentDidMount() {
        // fetch actual history data from server based on user id
        fetch(this.jsonUrl).then(result => {
            result.json().then(data =>
                this.setState({loading: false, history: data.history, user_score: data.score}))
        });
    }

    render() {
        if (this.state.loading) return <Loading />;
        console.log(this.state.history[0]);
        
        return (
            <div className="container">
                <PageHeader className="homeTitle">
                    <span style={{fontFamily: 'Avenir Next'}}>User History for {this.state.userID}</span>
                </PageHeader>
            </div>
        );
    }

}