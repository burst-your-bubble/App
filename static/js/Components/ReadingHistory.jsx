import React from 'react';
import { Panel, Pagination } from 'react-bootstrap';
import { ArticleBox } from './ArticleBox';

export class ReadingHistory extends React.Component {
    constructor(props) {
        super(props);
        this.PAGE_LENGTH = 10;
        this.state = {
            currentPage: 1,
            numPages: Math.trunc(this.props.history.length/this.PAGE_LENGTH) + 1,
            articles: this.props.history
        }
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handleNextClick() {
        let currentPage = this.state.currentPage + 1 > this.state.numPages ? this.state.numPages : this.state.currentPage + 1;
        this.setState({currentPage: currentPage});
    }

    handlePrevClick() {
        let currentPage = this.state.currentPage - 1 < 1 ? 1 : this.state.currentPage - 1;
        this.setState({currentPage: currentPage});
    }

    handlePageClick(i) {
        let currentPage = i > this.state.numPages ? this.state.numPages : i;
        this.setState({currentPage: currentPage});
    }

    render() {
        var i = (this.state.currentPage - 1) * this.PAGE_LENGTH;
        var displayedArticles = this.state.articles.slice(i, i + 10);
        var articles = displayedArticles.map(article => {
            return (
                <ArticleBox title={article.title}
                    summary={article.summary}
                    stance={article.stance}
                    url={article.url}
                    id={article.id}
                    read={article.read}
                    response={article.response}
                />)
        });

        var pages = [];
        for(let i = 1; i < this.state.numPages + 1; i++ ) {
            pages.push((
                <Pagination.Item 
                    active={i==this.state.currentPage}
                    onClick={() => this.handlePageClick(i) }>
                        {i}
                </Pagination.Item>
            ));
        }

        return (
            <Panel id="story-box" >
                <Panel.Heading style={{ cursor: "pointer" }} className="topic-box">
                    <Panel.Title style={{ fontFamily: 'Avenir Next-DemiBold' }} componentClass="span">
                        Reading History
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    {articles}
                    <div style={{width: 'fit-content', margin: 'auto'}}>
                        <Pagination>
                            <Pagination.Prev onClick={this.handlePrevClick} />
                            {pages}
                            <Pagination.Next onClick={this.handleNextClick} />
                        </Pagination>   
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}