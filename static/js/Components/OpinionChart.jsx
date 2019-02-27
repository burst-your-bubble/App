import React from 'react';
import { DiscreteColorLegend, RadialChart } from 'react-vis';
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { Loading } from '../Components/Loading';

export class OpinionChart extends React.Component {
    constructor(props) {
        super(props);
        this.jsonUrl = `/api/history`;

        this.state = {
            loading: true,
            history: null,
            user_score: null,
            userID: null,
            value: false,
            expanded: true,
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

    getProportions(stance) {
        const data = [{
            angle: 0,
            label: "Agree",
            color: "#5cb85c"
        },
        {
            angle: 0,
            label: "Neutral",
            color: "#ec971f"
        },
        {
            angle: 0,
            label: "Disagree",
            color: "#d9534f"
        }];

        for (var i = 0; i < this.state.history.length; i++) {
            switch (stance) {
                case 'left':
                    if (this.state.history[i].stance == 'L') {
                        if (this.state.history[i].response == -1)
                            data[2].angle++;
                        if (this.state.history[i].response == 0)
                            data[1].angle++;
                        if (this.state.history[i].response == 1)
                            data[0].angle++;
                    }
                    break;
                case 'center':
                    if (this.state.history[i].stance == 'C') {
                        if (this.state.history[i].response == -1)
                            data[2].angle++;
                        if (this.state.history[i].response == 0)
                            data[1].angle++;
                        if (this.state.history[i].response == 1)
                            data[0].angle++;
                    }
                    break;
                case 'right':
                    if (this.state.history[i].stance == 'R') {
                        if (this.state.history[i].response == -1)
                            data[2].angle++;
                        if (this.state.history[i].response == 0)
                            data[1].angle++;
                        if (this.state.history[i].response == 1)
                            data[0].angle++;
                    }
                    break;
            }
        }

        return data;
    }

    render() {
        const { value } = this.state;

        if (this.state.loading) return <Loading />;

        const leftData = this.getProportions('left');
        const rightData = this.getProportions('right');
        const centerData = this.getProportions('center');
        const legend = [
            { title: 'Agree', color: "#5cb85c" },
            { title: 'Neutral', color: "#ec971f" },
            { title: 'Disagree', color: "#d9534f" },
        ];

        if (this.state.history == null)
            return <p> You haven't interacted with any articles yet, find some topics to read <a href="/home">here</a>!</p>

        let chartStyle = {margin: 'auto', width: 'fit-content'}

        return (
            <div>
                <Panel id="story-box" expanded={this.state.expanded} >
                    <Panel.Heading style={{ cursor: "pointer" }} onClick={this.handleClick} className="topic-box">
                        <Panel.Title style={{ fontFamily: 'Avenir Next-DemiBold' }} componentClass="span">
                            Your Opinions
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <Grid componentClass="none" className="container">
                                <Row className="show-grid">
                                    <Col sm={4}>
                                       <div style={chartStyle}>
                                        <RadialChart
                                                data={leftData}
                                                innerRadius={50}
                                                radius={70}
                                                width={150}
                                                height={150}
                                                colorType="literal"
                                                padAngle={0.04}
                                            />
                                            Left Leaning
                                       </div>
                                    </Col>
                                    <Col sm={4}>
                                       <div style={chartStyle}>
                                       <RadialChart
                                            data={centerData}
                                            innerRadius={50}
                                            radius={70}
                                            width={150}
                                            height={150}
                                            colorType="literal"
                                            padAngle={0.04}
                                        />
                                        Center Leaning
                                       </div>

                                    </Col>
                                    <Col sm={4}>
                                        <div style={chartStyle}>
                                        <RadialChart
                                            data={rightData}
                                            innerRadius={50}
                                            radius={70}
                                            width={150}
                                            height={150}
                                            colorType="literal"
                                            padAngle={0.04}
                                        />
                                        Right Leaning
                                        </div>

                                    </Col>
                                </Row>
                            </Grid>
                            <DiscreteColorLegend className="legend" orientation="horizontal" items={legend} />
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div >)
    }
}