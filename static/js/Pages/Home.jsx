import React from 'react';
import { TopicBox } from '../Components/TopicBox';
import { Loading } from '../Components/Loading';
import { Grid, Row, Col, PageHeader, Button, Modal } from 'react-bootstrap';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = '/api/topics';
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            loading: true,
            topics: null,
            user_score: null,
            show: false,
            userId: null,
        }

        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // GET mock json data, when it comes back put it into state.
        fetch(this.jsonUrl).then(res => {
            res.json().then(data =>
                this.setState({ loading: false, topics: data.topics, user_score: data.score, userId: data.userId })
            );
        });
    }

    handleShow() {
        this.setState({ show: true });
    }    

    handleClose() {
        this.setState({ show: false });

    }

    render() {
        let userHistory = `/history`;

        // Display a loading screen until the json data comes back from server
        if (this.state.loading) return <Loading />;

        const secondColumnStart = Math.floor(this.state.topics.length / 2);


        var storiesL = this.state.topics.slice(0, secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    topicID={story.id}
                    summary={story.summary}
                    articles={story.articles}
                    score={this.state.user_score} />)
        });

        var storiesR = this.state.topics.slice(secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    topicID={story.id}
                    summary={story.summary}
                    articles={story.articles}
                    score={this.state.user_score} />)
        });


        return (
            <div className="container">
                <PageHeader className="homeTitle">
                    <span style={{fontFamily: 'Avenir Next'}}>Burst Your Bubble</span>
                    <Button bsStyle="success" onClick={this.handleShow}>Email Feedback</Button>
                    <Button bsStyle="primary" href={userHistory}>See History</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Body>
                            <h4>Thanks for providing us with feedback!</h4>
                            <p>
                                <form action="mailto:karr@carleton.edu" method="post" encType="text/plain">
                                    <input type="text" name="mail" placeholder="Email" /> <br></br>
                                    <input type="text" name="feedback" placeholder="Feedback" /><br></br>
                                    <input type="submit" value="Send" />
                                </form>
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Cancel</Button>
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