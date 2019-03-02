import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, PageHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitFeedback = this.submitFeedback.bind(this);

        this.state = {
            show: false,
            value: null,
            hint: false,
        }
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    submitFeedback() {
        fetch(`/api/feedback`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feedback: this.state.value
            })
        }).then(() => {window.location.href = '/home'});

    }

    render() {
        let navLinkStyle = {margin: '1rem', fontSize: '1.5rem', cursor: "pointer"};
        return (
            <div >
                <PageHeader className="homeTitle">
                    <Grid>
                        <Row>
                            <Col md={8}><span style={{fontFamily: 'Avenir Next'}}>{this.props.title}</span></Col>
                            <Col md={4}>
                                <Link style={navLinkStyle} to='/home'>Home</Link>
                                <Link style={navLinkStyle} to='/history'>History</Link>
                                <Link style={navLinkStyle} to='/about'>About</Link>
                                <Link style={navLinkStyle} onClick={this.handleShow} to='\\'>Feedback</Link>                     
                            </Col>
                        </Row>
                    </Grid>
                </PageHeader>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Thank you for your feedback!</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Enter text"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Validation is based on string length.</HelpBlock>
                            </FormGroup>
                            <Button onClick={this.submitFeedback}>Submit</Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}