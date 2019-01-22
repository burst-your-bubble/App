import React from 'react';

import { Loading } from '../Components/Loading';
import { Media, Button, Modal, ButtonToolbar } from 'react-bootstrap';

export class Article extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.jsonUrl = `/json/article/${this.id}`;
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            loading: true,
            article: null,
            show: false,
            response: ""
        };
    }

    componentDidMount() {
        // fetch actual article data from server based on article id
        fetch(this.jsonUrl).then(res => {
            res.json().then(article => {
                this.setState({ article: article, loading: false });
            });
        });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleResponse() {
        {/* Send the response here back to home */}
        window.location.href = "/home";
    }

    render() {
        if (this.state.loading) return <Loading />;

        return (
            <div>
                <Media className="articlePage">
                    <Media.Left>
                        <img width={64} height={64} object-fit={"cover"} src={this.state.article.imageUrl} alt="thumbnail" />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading> {this.state.article.title} </Media.Heading>
                        <p className="articleSummary">{this.state.article.summary}</p>
                    </Media.Body>
                    <p className="articleText">
                        {this.state.article.datePublished} • By {this.state.article.author}
                    </p>
                    <p className="articleText">
                        {this.state.article.text}
                    </p>
                    <Button bsStyle="info" onClick={this.handleShow}>Done Reading</Button>
                </Media>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <h4>{this.state.article.title}</h4>
                        <p>
                            {this.state.article.summary}
                        </p>
                        <ButtonToolbar>
                            {/* Capture what button is clicked into 'response' */}
                            <Button bsStyle="success" onClick={this.handleResponse}>Agree</Button>
                            <Button bsStyle="warning" onClick={this.handleResponse}>Neutral</Button>
                            <Button bsStyle="danger" onClick={this.handleResponse}>Disagree</Button>
                        </ButtonToolbar>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}