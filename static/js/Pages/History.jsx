import React from 'react';
import { PageHeader } from 'react-bootstrap';

export class History extends React.Component {

    constructor(props) {
        super(props);
        
        this.jsonUrl = `/api/history/${this.id}`;
    }

    render() {
        console.log(this.jsonUrl);

        return (
            <div className="container">
                <PageHeader className="homeTitle">
                    <span style={{fontFamily: 'Avenir Next'}}>User History</span>
                </PageHeader>
            </div>
        );
    }

}