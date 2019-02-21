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
            showSource: false
        };

        this.handleResponse = this.handleResponse.bind(this);
    }

    componentDidMount() {
        // fetch actual article data from server based on article id
        fetch(this.jsonUrl).then(res => {
            res.json().then(article => {
                this.setState({ article: article, loading: false });
            });
        });
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

        return (
            <div className="container">
                <Media className="articlePage">
                    <Media.Left>
                        <img width={64} height={64} object-fit={"cover"} src={this.state.article.imageUrl} alt="thumbnail" />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading> {this.state.article.title} </Media.Heading>
                        <p className="articleSummary">{this.state.article.summary}</p>
                    </Media.Body>
                    <p className="articleText">
                        {this.state.article.datePublished} • 
                        By {this.state.article.author} •&nbsp;
                        {this.state.showSource? <a href={this.state.article.url}>{this.state.article.source}</a> : <span className="show-source" onClick={() => this.setState({showSource: true})}>Show Source</span>}
                    </p>
                    <p className="articleText">
                        {text}
                    </p>
                    <ButtonToolbar>
                        <Button bsStyle="danger" onClick={this.handleReportShow}>Report</Button>
                        <Button bsStyle="info" onClick={this.handleDoneShow}>Done Reading</Button>
                    </ButtonToolbar>
                </Media>

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
                        <h4>{this.state.article.title}</h4>
                        <p>
                            {this.state.article.summary}<br></br>
                            <b>We're sorry that something's wrong! What seems to be the problem?</b>
                        </p>
                        <ListGroup>
                            <ListGroupItem action bsStyle = "danger" onClick={() => this.handleReporting("factually_incorrect")}>The article is factually incorrect</ListGroupItem>
                            <ListGroupItem action bsStyle = "warning" onClick={() => this.handleReporting("not_an_article")}>This isn't a news article</ListGroupItem>
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