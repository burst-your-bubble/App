import React from 'react';

import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import { TopicBox } from '../Components/TopicBox';

import { PageHeader, Button } from 'react-bootstrap';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
`;

export class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = '/api/topics';
        this.state = {
            loading: true,
            topics: null
        }

        this.componentDidMount.bind(this);
        this.isDoneReading.bind(this);
        this.doneReading.bind(this);
    }

    componentDidMount() {
        // GET mock json data, when it comes back put it into state.
        fetch(this.jsonUrl).then(res => {
            res.json().then(data =>
                this.setState({ loading: false, topics: data.topics })
            );
        });
    }

    isDoneReading(firstStory) {
        for (var i = 0; i < firstStory.props.articles.length; i++) {
            if (firstStory.props.articles[i].read == false)
                return false;
        }
        return true;
    }

    doneReading(){
        window.location.href='/home';
    }

    render() {
        // Display a loading screen until the json data comes back from server
        if (this.state.loading) return (
            <div className='loader-container'>
                <div className='sweet-loading'>
                    <PacmanLoader
                        css={override}
                        sizeUnit={"px"}
                        size={25}
                        color={'#4A4A4A'}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );

        var firstStory = this.state.topics[0];
        firstStory = <TopicBox topic={firstStory.story}
            summary={firstStory.summary}
            articles={firstStory.articles} />

        return (
            <div className="container">
                <PageHeader className="homeTitle">Burst Your Bubble</PageHeader>
                {firstStory}
                <Button variant="dark" size="lg"
                    disabled={!this.isDoneReading(firstStory)}
                    onClick={() => this.doneReading()}>
                    Done Reading
                </Button>{' '}
            </div>
        );
    }
}