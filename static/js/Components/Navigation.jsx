import React from 'react';
import { Modal, Button, Grid, Row, Col, PageHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom';

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
        let navLinkStyle = {margin: '1rem', fontSize: '2rem'};
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
                                <Link style={navLinkStyle} to='/home'>Feedback</Link>                     
                            </Col>
                        </Row>
                    </Grid>
                </PageHeader>

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