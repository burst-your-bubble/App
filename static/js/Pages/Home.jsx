import React from 'react';
import { TopicBox } from '../Components/TopicBox';
import { Loading } from '../Components/Loading';
import { Grid, Row, Col, PageHeader, Button, Modal, ButtonToolbar, Form, FormGroup, FormControl } from 'react-bootstrap';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = '/api/topics';
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleIntroShow = this.handleIntroShow.bind(this);
        this.handleIntroClose = this.handleIntroClose.bind(this);

        this.state = {
            loading: true,
            topics: null,
            user_score: null,
            introShow: true,
            show: false,
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

    handleShow() {
        this.setState({ show: true });
    }


    handleClose() {
        this.setState({ show: false });

    }

    handleIntroShow() {
        this.setState({ introShow: true });
    }

    handleIntroClose() {
        this.setState({ introShow: false });
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
            <div>
                <PageHeader className="homeTitle">
                    Burst Your Bubble <br></br>
                    <Button bsStyle="success" onClick={this.handleShow}>Email Feedback</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
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
                            <Button onClick={this.handleClose}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </PageHeader>

                <Modal show={this.state.introShow} onHide = {this.handleIntroClose}>
                        <Modal.Body>
                            <h4>Welcome to Burst Your Bubble!</h4>
                            <p>
                                Thanks for trying out a whole new way of consuming news! In Burst Your Bubble, we've curated some of the most important news topics for the day. <br></br>
                                1. Within each topic, we've provided you with 5 articles from various parts of the political spectrum.<br></br>
                                2. Read the articles, and record what you think of the opinion presented in the article.<br></br>
                                3. Keep reading and reacting, we'll update the articles we show you to keep you well informed!
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleIntroClose}>Got it!</Button>
                        </Modal.Footer>
                </Modal>

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