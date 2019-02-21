import React from 'react';

import { ButtonToolbar, Button, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, PageHeader, Alert } from 'react-bootstrap';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showAlert: false,
            errorMessage: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        {/* Send the response for validation here and then proceed to home */ }
        e.preventDefault();
        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        fetch('/login', {
            body: formData,
            method: 'POST'
        })
        .then(response => response.json())
        .then(result => {
            if(!result.success) {
                this.setState({showAlert: true, errorMessage: result.message});
            } else {
                window.location.href = '/home';
            }
        });
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({ [fieldName]: fieldVal })
    }

    handleRegister() {
        window.location.href = "/register";
    }

    render() {
        let alert = null;
        if(this.state.showAlert) alert = <Alert bsStyle="danger">Login Failed: {this.state.errorMessage}</Alert>;
        return (
            <div>
            <Form horizontal className="container" onSubmit={this.handleLogin}>
                <PageHeader className="homeTitle">Login</PageHeader>
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
                            onChange={this.handleChange.bind(this)}                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <ButtonToolbar>
                            <Button variant="outline-primary" type="submit">Login</Button>
                            <Button variant="dark" onClick={this.handleRegister}>Register</Button>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>
                {alert}
            </Form>
            </div>)
    }
}
