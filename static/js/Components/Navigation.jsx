import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

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
        console.log(this.state.value);
    }

    render() {
        return (
            <div >
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/history">History</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a onClick={this.handleShow} style={{ cursor: "pointer" }}>Feedback</a></li>
                </ul>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Working example with validation</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Enter text"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Validation is based on string length.</HelpBlock>
                            </FormGroup>
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