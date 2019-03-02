import React from 'react';
import { PageHeader, Panel, Grid, Row, Col } from 'react-bootstrap';
import { Loading } from '../Components/Loading';
import { ReadingHistory } from '../Components/ReadingHistory';
import { ScoreGraph } from '../Components/ScoreGraph';
import { OpinionChart } from '../Components/OpinionChart';
import { Navigation } from '../Components/Navigation';

export class History extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = `/api/history`;

        this.state = {
            loading: true,
            history: null,
            user_score: null,
            userID: null,
            expanded: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount.bind(this);

    }

    componentDidMount() {
        // fetch actual history data from server based on user id
        fetch(this.jsonUrl).then(result => {
            result.json().then(data =>
                this.setState({ loading: false, history: data.history, user_score: data.score, userID: data.userID }))
        });
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        if (this.state.loading) return <Loading />;

        var articles = this.state.history;

        var left = 0, right = 0, center = 0;

        if(articles == null){
            return <h4 className="loader-container"><span>You don't have a reading history yet! Find some topics to read <a href="/home"> here</a>!</span></h4>;
        }

        for (var i = 0; i < articles.length; i++) {
            if (this.state.history[i].stance == "L") left++;
            if (this.state.history[i].stance == "C") center++;
            if (this.state.history[i].stance == "R") right++;
        }

        return (
            <div className="container">
                <Navigation title="Your History"/>
                <Grid componentClass="none">
                    <Row className="show-grid">
                        <Col sm={3} className="centerObjects">
                            <b><h2 style={{ color: "#00000" }}>{articles.length}</h2> articles read</b>
                        </Col>
                        <Col sm={3} className="centerObjects">
                            <h2 style={{ color: "#99999A" }}>{left}</h2> <b>left leaning</b>
                        </Col>
                        <Col sm={3} className="centerObjects">
                            <h2 style={{ color: "#99999A" }}>{center}</h2> <b>center leaning</b>
                        </Col>
                        <Col sm={3} className="centerObjects">
                            <h2 style={{ color: "#99999A" }}>{right}</h2> <b>right leaning</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="centerObjects" style={{padding: "1%"}}>
                            <h4>Reading Trends</h4> 
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={6}>
                            <OpinionChart />
                        </Col>
                        <Col sm={6}>
                            <ScoreGraph />
                        </Col>
                    </Row>
                </Grid>
                <Panel.Body>
                    <ReadingHistory history={this.state.history} />
                </Panel.Body>
            </div>
        );
    }
}