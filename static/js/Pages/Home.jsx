import React from 'react';

import { Loading } from '../Components/Loading';
import { TopicBox } from '../Components/TopicBox';

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = '/json/topics';
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

        const secondColumnStart = Math.floor(this.state.topics.length / 2);

        var storiesL = this.state.topics.slice(0, secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    summary={story.summary}
                    articles={story.articles} />)
        })

        var storiesR = this.state.topics.slice(secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    summary={story.summary}
                    articles={story.articles} />)
        })

        return (
            <div>
                <PageHeader className = "homeTitle">Burst Your Bubble</PageHeader>
                <Grid>
                    <Row className="show-grid">
                        <Col md={6} mdPush={6}>
                            {storiesL}
                        </Col>
                        <Col md={6} mdPull={6}>
                            {storiesR}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}