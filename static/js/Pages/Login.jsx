import React from 'react';

import { ButtonToolbar, Button, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, PageHeader } from 'react-bootstrap';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        {/* Send the response for validation here and then proceed to home */ }
        window.location.href = "/home";
        console.log(this.state.email);
        console.log(this.state.password);
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
        return (
            <Form horizontal className="container">
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
                            <Button variant="outline-primary" onClick={this.handleLogin}>Login</Button>
                            <Button variant="dark" onClick={this.handleRegister}>Register</Button>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>
            </Form>)
    }
}