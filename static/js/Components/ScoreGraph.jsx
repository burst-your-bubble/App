import React from 'react';
import { XYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries } from 'react-vis';

export class ScoreGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.yTicks = [];
        for(let i = -1; i <= 1; i+=0.1) {
            this.yTicks.push(i.toFixed(1));
        }
        console.log(this.yTicks);
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

        return (
            <div className="container" style={{width: 'fit-content', backgroundColor: 'white'}}>
                <h1>Stance Over Time</h1>
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