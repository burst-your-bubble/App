import React from 'react';
import { ButtonToolbar, Button, Form, FormGroup, Col, FormControl, ControlLabel, Checkbox, PageHeader } from 'react-bootstrap';

export class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleNext = this.handleNext.bind(this);
    }

    handleBack() {
        window.location.href = "/";
    }

    handleNext() {
        {/* Add the response for to database and then proceed to quiz */ }
        window.location.href = "/quiz";
        console.log(this.state.email);
        console.log(this.state.password);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        this.setState({ [fieldName]: fieldVal })
    }

    render() {
        return (
            <Form action="/register" method="POST" horizontal className="container">
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
                            <Button variant="outline-primary" type="submit">Next</Button>
                        </ButtonToolbar>
                    </Col>
                </FormGroup>
            </Form>)
    }
}
