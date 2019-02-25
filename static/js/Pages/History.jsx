import React from 'react';
import { PageHeader } from 'react-bootstrap';
import { Loading } from '../Components/Loading';

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
                this.setState({loading: false, history: data.history, user_score: data.score, userID:data.userID}))
        });
    }

    render() {
        if (this.state.loading) return <Loading />;
        
        return (
            <div className="container">
                <PageHeader className="homeTitle">
                    <span style={{fontFamily: 'Avenir Next'}}>User History for {this.state.userID}</span>
                </PageHeader>
            </div>
        );
    }

}