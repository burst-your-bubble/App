import React from 'react';
import { Modal, Button } from 'react-bootstrap'

export class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        }
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div >
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/history">History</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a onClick={this.handleShow} style={{cursor: "pointer"}}>Feedback</a></li>
                </ul>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <h4>Thanks for providing us with feedback!</h4>
                        <p>
                            <form action="mailto:karr@carleton.edu" method="post" encType="text/plain">
                                <input type="text" name="mail" placeholder="Email" /> <br></br>
                                <input type="text" name="feedback" placeholder="Feedback" /><br></br>
                                <input type="submit" value="Send" />
                            </form>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}