import React from 'react';
import { Modal, ButtonToolbar, Button, Form, FormGroup, Col, FormControl, ControlLabel, Alert, PageHeader } from 'react-bootstrap';

export class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            introShow: false,
            showAlert: false,
            alertMessage: ''
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleIntroShow = this.handleIntroShow.bind(this);
        this.handleIntroClose = this.handleIntroClose.bind(this);
        this.validCredentials = this.validCredentials.bind(this);
    }

    validCredentials() {
        return (this.state.email != '' && this.state.password != '');
    }

    handleBack() {
        window.location.href = "/";
    }

    handleNext() {
        {/* Add the response for to database and then proceed to home */ }
        window.location.href = "/home";
        console.log(this.state.email);
        console.log(this.state.password);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({ [fieldName]: fieldVal })
    }

    handleIntroShow() {
        this.setState({ introShow: true });
    }

    handleIntroClose() {
        this.setState({ introShow: false });

        if(!this.validCredentials()) {
            this.setState({showAlert: true, alertMessage: "Invalid Email or Password"});
            return;
        }

        var formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        fetch('/register', {
            body: formData,
            method: 'POST'
        })
        .then(res => res.json())
        .then(response => {
            if(response.success) {
                window.location.href = '/home';
            }
            else {
                this.setState({showAlert: true, alertMessage: response.message});
            }
        });

    }

    render() {
        var alert = this.state.showAlert? <Alert bsStyle="danger">Login Failed: {this.state.alertMessage}</Alert> : null;
        return (
            <Form horizontal className="container">
                <PageHeader className="homeTitle">Register</PageHeader>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type='text'
                            name='email'
                            placeholder='Enter Email'
                            defaultValue={this.state.email}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type='password'
                            name='password'
                            placeholder='Password'
                            defaultValue={this.state.password}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <ButtonToolbar>
                            <Button variant="dark" onClick={this.handleBack}>Back</Button>
                            <Button variant="outline-primary" onClick={this.handleIntroShow}>Next</Button>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>

                {alert}

                <Modal show={this.state.introShow} onHide = {this.handleIntroClose}>
                        <Modal.Body>
                            <h4>Welcome to Burst Your Bubble!</h4>
                            <p>
                                Thanks for trying out a whole new way of consuming news! In Burst Your Bubble, we've curated some of the most important news topics for the day. <br></br>
                                In 3 simple steps you too can "Burst Your Bubble":<br></br>
                                1. Within each topic, we've provided you with 5 articles from various parts of the political spectrum.<br></br>
                                2. Read the articles, and record what you think of the opinion presented in the article<br></br>
                                3. Keep reading and reacting, we'll update the articles we show you to keep you well informed!
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleIntroClose}>Got it!</Button>
                        </Modal.Footer>
                </Modal>

            </Form>)
    }
}
