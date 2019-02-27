import React from 'react';
import { XYPlot, HorizontalGridLines, XAxis, YAxis, LineSeries } from 'react-vis';

export class ScoreGraph extends React.Component {
    constructor(props) {
        super(props);
        this.jsonUrl = `/api/scoreGraph`;

        this.state = {
            data: null,
            loading: true
        }
<<<<<<< HEAD
        this.yTicks = [];
        for(let i = -1; i <= 1; i+=0.1) {
            this.yTicks.push(i.toFixed(1));
        }
=======
        this.scoresUrl = '/api/scoregraph'
>>>>>>> e00434f2527aa443ec161689b55aa6ff0ee0f9f4
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

        if(this.state.data == null)
            return <p> You haven't interacted with enough articles yet, find some topics to read <a href="/home">here</a>!</p>

        let graphWidth = document.documentElement.clientWidth > 575? 500 : 300;

        return (
            <div>
                <h4><b>Stance Over Time</b></h4>
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