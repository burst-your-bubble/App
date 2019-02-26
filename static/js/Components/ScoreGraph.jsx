import React from 'react';
import { XYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries } from 'react-vis';

export class ScoreGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.scoresUrl = '/api/scoregraph'
    }

    componentDidMount() {
        fetch(this.scoresUrl)
            .then(res => res.json())
            .then(result => {
                let scores = result.graph_y;
                let data = scores.map((score, i) => {return {x: i, y: score}});
                this.setState({
                    data: data
                });
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