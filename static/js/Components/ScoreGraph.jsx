import React from 'react';
import { XYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries } from 'react-vis';

export class ScoreGraph extends React.Component {
    constructor(props) {
        super(props);
        this.jsonUrl = `/api/scoreGraph`;

        this.state = {
            data: null
        }
        this.yTicks = [];
        for(let i = -1; i <= 1; i+=0.1) {
            this.yTicks.push(i.toFixed(1));
        }
    }

    componentDidMount() {
        let scores = [-.7,-.2,-.5,.3,0]; // TODO: This data will come from Kai's server endpoint
        let data = scores.map((score, i) => {return {x: i, y: score}});
        this.setState({
            data: data
        });
    }

    render() {
        if (!this.state.data) return <span>Loading...</span>;

        if(this.state.data == null)
            return <p> You haven't interacted with enough articles yet, find some topics to read <a href="/home">here</a>!</p>

        return (
            <div>
                <h4><b>Stance Over Time</b></h4>
                <span>0 is neutral/Positive is Right-leaning/Negative is Left-leaning</span>
                <XYPlot height={300} width={500}>
                    <HorizontalGridLines />
                    <XAxis hideTicks />
                    <YAxis title="Stance Score" />
                    <LineSeries data={this.state.data} color='green' style={{strokeWidth: 1}} curve={'curveMonotoneX'}/>
                </XYPlot>   
            </div>
        )
    }
}