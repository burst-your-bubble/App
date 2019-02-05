import React from 'react';
class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q1 = 
        }
        this.q1 = props.q1
        this.q2 = props.q2
        this.handleAnswer.bind(this);
    }
    handleIntro() {
        {/* Send the response here back to home */}
        window.location.href = "/home";
    }
    handleAnswer(question,ans){
    	this.state.ans[question] = ans
	}

	render(props){
		return(
			<h4>{this.q1.title}</h4>
                        <p>
                            {this.q1.summary}
                        </p>
                        <ButtonToolbar>
                            {/* Capture what button is clicked into 'response' */}
                            <Button bsStyle="success" onClick={this.handleResponse}>Agree</Button>
                            <Button bsStyle="warning" onClick={this.handleResponse}>Neutral</Button>
                            <Button bsStyle="danger" onClick={this.handleResponse}>Disagree</Button>
                        </ButtonToolbar>
			<div>
			<Button onClick={this.handleIntro}>Finish</Button>
			</div>
		);
}
}
export default Intro;