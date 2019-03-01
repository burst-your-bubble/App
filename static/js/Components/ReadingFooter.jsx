import React from 'react';
import { Button } from 'react-bootstrap';
import readingTime from 'reading-time';

export const ReadingFooter = props => {
    
    var stats = readingTime(props.text);

    // Update the progressbar onScroll
    window.onscroll = () => {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("progressBar").style.width = scrolled + "%";
    };


    return (
        <div className="footer">
            <div className="left">
                <Button bsStyle="danger" onClick={props.handleReportShow}>Report</Button>
            </div>
            <div className="center">
                Approximately {stats.text}
            </div>
            <div className="right">
                <Button bsStyle="success" onClick={props.handleDoneShow}>Done Reading</Button>
            </div>
            <div className="progress-container">
                <div className="progress-bar" id="progressBar"></div>
            </div>
        </div>  
    )
}