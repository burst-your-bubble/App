import React from 'react';
import { PageHeader, Panel, ProgressBar } from 'react-bootstrap';
import { Loading } from '../Components/Loading';
import { ArticleBox } from '../Components/ArticleBox';
import { DiscreteColorLegend, RadialChart } from 'react-vis';
import { ScoreGraph } from '../Components/ScoreGraph';

const ITEMS = [
    { title: 'Agree', color: "#5cb85c" },
    { title: 'Neutral', color: "#ec971f" },
    { title: 'Disagree', color: "#d9534f" },
];

export class History extends React.Component {

    constructor(props) {
        super(props);
        this.jsonUrl = `/api/history`;

        this.state = {
            loading: true,
            history: null,
            user_score: null,
            userID: null,
        }

        this.componentDidMount.bind(this);

    }

    componentDidMount() {
        // fetch actual history data from server based on user id
        fetch(this.jsonUrl).then(result => {
            result.json().then(data =>
                this.setState({ loading: false, history: data.history, user_score: data.score, userID: data.userID }))
        });
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
        if (this.state.loading) return <Loading />;

        var articles = this.state.history.map(article => {
            return (
                <ArticleBox title={article.title}
                    summary={article.summary}
                    stance={article.stance}
                    url={article.url}
                    id={article.id}
                    read={article.read}
                    response={article.response}
                />)
        });

        const leftData = this.getProportions('left');
        const rightData = this.getProportions('right');
        const centerData = this.getProportions('center');

        return (
            <div className="container">
                <PageHeader className="homeTitle">
                    <span style={{ fontFamily: 'Avenir Next' }}>Your History</span>
                </PageHeader>
                <Panel.Body>
                    <h4><b>Opinion Trends on Articles</b></h4>
                    <div className="charts">
                        <section className="centerObjects">
                            <RadialChart
                                data={leftData}
                                innerRadius={100}
                                radius={140}
                                width={300}
                                height={300}
                                colorType="literal"
                                padAngle={0.04}
                            //showLabels={true}
                            />
                            Left Leaning
                        </section>
                        <section className="centerObjects">
                            <RadialChart
                                data={centerData}
                                innerRadius={100}
                                radius={140}
                                width={300}
                                height={300}
                                colorType="literal"
                                padAngle={0.04}
                            //showLabels={true}
                            />
                            Center Leaning
                        </section>
                        <section className="centerObjects">
                            <RadialChart
                                data={rightData}
                                innerRadius={100}
                                radius={140}
                                width={300}
                                height={300}
                                colorType="literal"
                                padAngle={0.04}
                            //showLabels={true}
                            />
                            Right Leaning
                        </section>
                        <DiscreteColorLegend orientation="vertical" width={300} items={ITEMS} />
                    </div>
                    <h4><b>Reading History</b></h4>
                    {articles}
                </Panel.Body>
                <ScoreGraph />
            </div>
        );
    }
}