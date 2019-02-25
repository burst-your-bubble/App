import React from 'react';
import { Media, Button, Modal, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Loading } from '../Components/Loading';

export class Article extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.jsonUrl = `/api/article/${this.id}`;
        this.handleDoneShow = this.handleDoneShow.bind(this);
        this.handleReportShow = this.handleReportShow.bind(this);
        this.handleDoneClose = this.handleDoneClose.bind(this);
        this.handleReportClose = this.handleReportClose.bind(this);

        this.state = {
            loading: true,
            article: null,
            doneShow: false,
            reportShow: false,
            showSource: false,
        };

        this.handleResponse = this.handleResponse.bind(this);
    }

    componentDidMount() {
        // fetch actual article data from server based on article id
        fetch(this.jsonUrl).then(res => {
            res.json().then(article => {
                this.setState({ id: article, loading: false });
            });
        })
    }

    handleDoneShow() {
        this.setState({ doneShow: true });
    }

    handleDoneClose() {
        this.setState({ doneShow: false });
    }

    handleReportShow() {
        this.setState({ reportShow: true });
    }

    handleReportClose() {
        this.setState({ reportShow: false });
    }

    handleResponse(response) {
        {/* Send the response here back to home */ }
        fetch(`/api/article/${this.id}/respond`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                response: response
            })
        }).then(() => window.history.back());
    }

    handleReporting(reportType) {
        {/* Send the response here back to home */ }
        fetch(`/api/article/${this.id}/report`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reportType: reportType
            })
        }).then(() => window.history.back());
    }

    render() {
        if (this.state.loading) return <Loading />;

        let paragraphs = this.state.article.text.split("\n");
        let text = paragraphs.map(paragraph => <p>{paragraph}</p>);

        var datePublished = new Date(this.state.article.datePublished);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var readingTime = require('reading-time');
        var stats = readingTime(this.state.article.text);

        //run this onScroll
        window.onscroll = function () { updateProgressBar() };

        //updating scroll bar while scrolling
        function updateProgressBar() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("progressBar").style.width = scrolled + "%";
        }

        return (
            <div className="container">
                <div className="body">
                    <Media className="article-header">
                        <Media.Left>
                            <img className="thumbnail" src={this.state.article.imageUrl} alt="thumbnail" />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading className="article-title"> {this.state.article.title} </Media.Heading>
                            <p className="article-summary">{this.state.article.summary}</p>
                            <p className="article-metaData">
                                {weekName[datePublished.getDay()]}, {monthNames[datePublished.getMonth()]} {datePublished.getDate()}, {datePublished.getFullYear()} •
                                By {this.state.article.author} •&nbsp;
                                {this.state.showSource ? <a href={this.state.article.url}>{this.state.article.source}</a> : <span className="show-source" onClick={() => this.setState({ showSource: true })}>Show Source</span>}
                            </p>
                        </Media.Body>
                        <hr></hr>
                        <p>
                            {text}
                        </p>
                    </Media>
                </div>
                <div className="footer">
                    <div className="left">
                        <Button bsStyle="danger" onClick={this.handleReportShow}>Report</Button>
                    </div>
                    <div className="center">
                        Approximately {stats.text}
                    </div>
                    <div className="right">
                        <Button bsStyle="success" onClick={this.handleDoneShow}>Done Reading</Button>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar" id="progressBar"></div>
                    </div>
                </div>

                <Modal show={this.state.doneShow} onHide={this.handleDoneClose}>
                    <Modal.Body>
                        <h4>{this.state.article.title}</h4>
                        <p>
                            <b>What is your take on the opinion presented in this article?</b>
                        </p>
                        <ButtonToolbar>
                            {/* Capture what button is clicked into 'response' */}
                            <Button bsStyle="success" onClick={() => this.handleResponse(1)}>Agree</Button>
                            <Button bsStyle="warning" onClick={() => this.handleResponse(0)}>Neutral</Button>
                            <Button bsStyle="danger" onClick={() => this.handleResponse(-1)}>Disagree</Button>
                        </ButtonToolbar>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleDoneClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.reportShow} onHide={this.handleReportClose}>
                    <Modal.Body>
                        <h4 >{this.state.article.title}</h4>
                        <p>
                            <b>We're sorry that something's wrong! What seems to be the problem?</b>
                        </p>
                        <ListGroup>
                            <ListGroupItem action bsStyle="danger" onClick={() => this.handleReporting("factually_incorrect")}>The article is factually incorrect</ListGroupItem>
                            <ListGroupItem action bsStyle="warning" onClick={() => this.handleReporting("not_an_article")}>This isn't a news article</ListGroupItem>
                            <ListGroupItem action onClick={() => this.handleReporting("bad_formatting")}>The text is badly formatted, garbled, or missing</ListGroupItem>
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleReportClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}