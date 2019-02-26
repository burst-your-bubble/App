import React from 'react';
import { XYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries } from 'react-vis';

export class ScoreGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true
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
                    data: data,
                    loading: false
                });
            });
        
    }

    render() {
        if(this.state.loading) return <span>Loading...</span>;
        if (!this.state.data) return null;

        let graphWidth = document.documentElement.clientWidth > 575? 500 : 300;
        return (
            <div className="container" style={{width: 'fit-content', backgroundColor: 'white'}}>
                <h1>Stance Over Time</h1>
                <span>0 is neutral/Positive is Right-leaning/Negative is Left-leaning</span>
                <XYPlot height={300} width={graphWidth}>
                    <HorizontalGridLines />
                    <XAxis hideTicks />
                    <YAxis title="Stance Score" />
                    <LineSeries data={this.state.data} color='green' style={{strokeWidth: 1}} curve={'curveMonotoneX'}/>
                </XYPlot>   
            </div>
        )
    }
}