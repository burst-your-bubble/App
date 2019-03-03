import React from 'react';
import { Media, Button, Modal, ButtonToolbar, ListGroup, ListGroupItem, Form, FormGroup, FormControl } from 'react-bootstrap';
import { Loading } from '../Components/Loading';
import { ReadingFooter } from '../Components/ReadingFooter';

export class Article extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.jsonUrl = `/api/article/${this.id}`;
        this.stanceText = ["disagree with", "take a neutral stance on", "agree with"];
        this.handleDoneShow = this.handleDoneShow.bind(this);
        this.handleReportShow = this.handleReportShow.bind(this);
        this.handleDoneClose = this.handleDoneClose.bind(this);
        this.handleReportClose = this.handleReportClose.bind(this);
        this.handleBack = this.handleBack.bind(this);

        this.state = {
            loading: true,
            article: null,
            doneShow: false,
            reportShow: false,
            commentShow: false,
            stance: null,
            showSource: false,
            disableButtons: false,
            reactionCommentText: null
        };

        this.handleResponse = this.handleResponse.bind(this);
        this.handleCommentModalChange = this.handleCommentModalChange.bind(this);
        this.handleCommentModalSubmit = this.handleCommentModalSubmit.bind(this);
    }

    componentDidMount() {
        // fetch actual article data from server based on article id
        fetch(this.jsonUrl).then(res => {
            res.json().then(article => {
                this.setState({ article: article, loading: false });
            });
        })
    }

    handleDoneShow() {
        this.setState({
            doneShow: true,
            commentShow: false
        });
    }

    handleDoneClose() {
        this.setState({
            doneShow: false,
            commentShow: false
        });
    }

    handleReportShow() {
        this.setState({ reportShow: true });
    }

    handleReportClose() {
        this.setState({ reportShow: false });
    }

    handleResponse(response) {
        this.setState({disableButtons: true});
        fetch(`/api/article/${this.id}/respond`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                response: response
            })
        }).then(() => {
            this.state.article.read = true;
            this.setState({
                doneShow: false,
                stance: this.stanceText[response + 1],
                commentShow: true
            });
        });
    }

    handleCommentModalSubmit(event) {
        event.preventDefault();

        if (this.state.reactionCommentText) {
            // submit comment to server
            fetch(`/api/article/${this.id}/comment`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: this.state.reactionCommentText
                })
            }).then((response) => {
                return response.json();
            }).then((comment) => {
                this.state.article.comments.push(comment);
                this.setState({
                    doneShow: false,
                    commentShow: false,
                    stance: null
                });
            });
        } else {
            window.location.href=sessionStorage.getItem('previous') ? sessionStorage.getItem('previous') : '/home';
        }
    }

    handleCommentModalChange(event) {
        this.setState({
            reactionCommentText: event.target.value
        });
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
        }).then(() => window.location.href = '/home');
    }

    handleBack() {
        window.location.href=sessionStorage.getItem('previous') ? sessionStorage.getItem('previous') : '/home'
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

        const comments = this.state.article.comments.map((item, key) =>
            <div className="article-comment" key={item.id}>
                <div className="article-comment-author">{item.author}</div>
                <div className="article-comment-text">{item.text}</div>
            </div>
        );

        //run this onScroll
        window.onscroll = function () { updateProgressBar() };

        //updating scroll bar while scrolling
        function updateProgressBar() {
            var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var scrolled = (winScroll / height) * 100;
            document.getElementById("progressBar").style.width = scrolled + "%";
        }

        if(!this.state.article.read){
            window.history.pushState(null, null, window.location.pathname);

            window.onpopstate = function (event) {
                if (event) {
                    this.setState({ doneShow: true });
                }
                else {
                    history.pushState(null, null, window.location.pathname);
                }
            }.bind(this)
        }
        else{
            window.onpopstate = function (event) {
                if (event) {
                    this.handleBack();
                }
                else {
                    history.pushState(null, null, window.location.pathname);
                }
            }.bind(this)
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
                        {this.state.article.read ?
                            <div>
                                <h2>Discussion</h2>
                                {comments}
                            </div>
                        : null}
                    </Media>
                </div>

                <ReadingFooter handleReportShow={this.handleReportShow} handleDoneShow={this.handleDoneShow} text={this.state.article.text} />

                <Modal show={this.state.doneShow || this.state.commentShow} onHide={this.handleDoneClose}>
                    <Modal.Body>
                        {this.state.commentShow ?
                            <div>
                                <h4>Thank you!</h4>
                                <p>
                                    Your opinion has been recorded. You can now join the conversation by leaving a comment, or click "Finish without commenting" to return home.
                                </p>
                                <Form onSubmit={this.handleCommentModalSubmit}>
                                    <FormGroup controlId="commentForm.comment">
                                        <FormControl componentClass="textarea" rows="3" placeholder={'Join the conversation by leaving a comment. For example, why did you '+this.state.stance+' this article?'} onChange={this.handleCommentModalChange} />
                                    </FormGroup>
                                </Form>
                            </div>
                        :
                            <div>
                                <h4>{this.state.article.title}</h4>
                                <p>
                                    <b>What is your take on the opinion presented in this article?</b>
                                </p>
                                <ButtonToolbar>
                                    {/* Capture what button is clicked into 'response' */}
                                    <Button disabled={this.state.disableButtons} bsStyle="success" onClick={() => this.handleResponse(1)}>Agree</Button>
                                    <Button disabled={this.state.disableButtons} bsStyle="warning" onClick={() => this.handleResponse(0)}>Neutral</Button>
                                    <Button disabled={this.state.disableButtons} bsStyle="danger" onClick={() => this.handleResponse(-1)}>Disagree</Button>
                                </ButtonToolbar>
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar style={{ float: "right" }}>
                            {this.state.commentShow ? <Button bsStyle="primary" onClick={this.handleCommentModalSubmit}>{this.state.reactionCommentText ? 'Save and finish' : 'Finish without commenting'}</Button> : <Button bsStyle="default" onClick={this.handleDoneClose}>Cancel</Button>}
                            <Button onClick={this.handleBack} bsStyle="primary">Not Now</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.reportShow} onHide={this.handleReportClose}>
                    <Modal.Body>
                        <h4>{this.state.article.title}</h4>
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
