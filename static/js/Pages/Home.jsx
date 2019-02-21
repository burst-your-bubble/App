import React from 'react';
import { TopicBox } from '../Components/TopicBox';
import { Loading } from '../Components/Loading';
import { Grid, Row, Col, PageHeader, Button, Modal, ButtonToolbar, Form, FormGroup, FormControl } from 'react-bootstrap';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = '/api/topics';
        this.handleFeedbackShow = this.handleFeedbackShow.bind(this);
        this.handleFeedbackClose = this.handleFeedbackClose.bind(this);

        this.state = {
            loading: true,
            topics: null,
            user_score: null,
            feedbackShow: false,
        }

        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // GET mock json data, when it comes back put it into state.
        fetch(this.jsonUrl).then(res => {
            res.json().then(data =>
                this.setState({ loading: false, topics: data.topics, user_score: data.score })
            );
        });
    }

    handleFeedbackShow() {
        this.setState({ feedbackShow: true });
    }

    handleFeedbackClose() {
        this.setState({ feedbackShow: false });
    }

    render() {
        // Display a loading screen until the json data comes back from server
        if (this.state.loading) return <Loading />;

        const secondColumnStart = Math.floor(this.state.topics.length / 2);

        var storiesL = this.state.topics.slice(0, secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    summary={story.summary}
                    articles={story.articles}
                    score={this.state.user_score} />)
        })

        var storiesR = this.state.topics.slice(secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    summary={story.summary}
                    articles={story.articles} />)
        })

        return (
            <div className="container">
                <PageHeader className="homeTitle">
                    <span style={{fontFamily: 'Avenir Next'}}>Burst Your Bubble</span>
                    <Button bsStyle="success" onClick={this.handleFeedbackShow}>Email Feedback</Button>
                    <Modal show={this.state.feedbackShow} onHide={this.handleFeedbackClose}>
                        <Modal.Body>
                            <h4>Thanks for providing us with feedback!</h4>
                            <p>
                                <form action="mailto:karr@carleton.edu" method="post" encType="text/plain">
                                    <input type="text" name="mail" placeholder="Email"/> <br></br>
                                    <input type="text" name="feedback" placeholder="Feedback"/><br></br>
                                    <input type="submit" value="Send"/>
                                </form>
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleFeedbackClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </PageHeader>
                <Grid componentClass="none">
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