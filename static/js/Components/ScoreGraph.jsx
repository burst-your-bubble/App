import React from 'react';
import { XYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries } from 'react-vis';
import { Panel } from 'react-bootstrap'

export class ScoreGraph extends React.Component {
    constructor(props) {
        super(props);
        this.scoresUrl = '/api/scoregraph'

        this.state = {
            data: null,
            loading: true,
            expanded: true,
        }

        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        fetch(this.scoresUrl)
            .then(res => res.json())
            .then(result => {
                let scores = result.graph_y;
                if(scores == null) {
                    this.setState({
                        loading: false
                    });
                }
                else{
                    let data = scores.map((score, i) => { return { x: i, y: score } });
                    this.setState({
                        data: data,
                        loading: false
                    });    
                }
            });
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        if (this.state.loading) return <span className="centerObjects">Loading...</span>;

        if (this.state.data == null)
            return <p> <b>Your Political Stance:</b> You haven't interacted with enough articles yet, find some topics to read <a href="/home">here</a>!</p>

        let graphWidth = document.documentElement.clientWidth > 575 ? 500 : 300;

        return (
            <div>
                <Panel id="story-box" expanded={this.state.expanded} >
                    <Panel.Heading style={{ cursor: "pointer" }} onClick={this.handleClick} className="topic-box">
                        <Panel.Title style={{ fontFamily: 'Avenir Next-DemiBold' }} componentClass="span">
                            Your Political Stance
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <span>0 is neutral/Positive is Right-leaning/Negative is Left-leaning</span>
                            <XYPlot height={300} width={graphWidth} yDomain={[-1,1]}>
                                <HorizontalGridLines />
                                <XAxis hideTicks />
                                <YAxis title="Stance Score" tickValues={[-1,0,1]} />
                                <LineSeries data={this.state.data} opacity={0.5} color='green' style={{ strokeWidth: 3 }} curve={'curveMonotoneX'} />
                            </XYPlot>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        )
    }
}