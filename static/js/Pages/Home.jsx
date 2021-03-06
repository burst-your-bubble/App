import React from 'react';
import { TopicBox } from '../Components/TopicBox';
import { Loading } from '../Components/Loading';
import { Grid, Row, Col} from 'react-bootstrap';
import { Navigation } from '../Components/Navigation';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = '/api/topics';

        this.state = {
            loading: true,
            topics: null,
            user_score: null,
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
        sessionStorage.removeItem('previous');
    }

    render() {
        // Display a loading screen until the json data comes back from server
        if (this.state.loading) return <Loading />;

        if(this.state.topics.length == 0){
            return <h4 className="loader-container"><span>We don't have any articles for you yet, please come back later!</span></h4>;
        }

        const expandedTopic = sessionStorage.getItem('opentopic');
        sessionStorage.removeItem('opentopic');

        const secondColumnStart = Math.floor(this.state.topics.length / 2);


        var storiesL = this.state.topics.slice(0, secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    topicID={story.id}
                    summary={story.summary}
                    articles={story.articles}
                    score={this.state.user_score}
                    expanded={story.id == expandedTopic} />)
        });

        var storiesR = this.state.topics.slice(secondColumnStart).map(story => {
            return (
                <TopicBox topic={story.story}
                    topicID={story.id}
                    summary={story.summary}
                    articles={story.articles}
                    score={this.state.user_score}
                    expanded={story.id == expandedTopic} />)
        });

        return (
            <div className="container">                
                <Navigation title="Burst Your Bubble" />
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