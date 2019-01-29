import React from 'react';

import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, PageHeader } from 'react-bootstrap';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleLogin() {
        {/* Send the response here back to home */}
        window.location.href = "/home";
    }

    render() {
        return (
            <Form horizontal className = "container">
                <PageHeader className="homeTitle">Burst Your Bubble</PageHeader>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="email"
                            placeholder="Email"
                            email={this.state.email}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            password={this.state.password}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.handleLogin}>Login</Button>
                    </Col>
                </FormGroup>
            </Form>)
    }
}
