import React from 'react';

import { Topic } from './Topic';

export class App extends React.Component {
    constructor(props) {
        super(props);

        // Hard code sample data that will eventually come from the server
        this.state = {
            articles: [
                {
                    headline: "News Story 1",
                    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante eros, aliquet ac magna et, congue luctus est. Cras et augue imperdiet, faucibus magna non, rutrum eros. Nunc aliquet, odio nec mattis pharetra, nisi tellus hendrerit est, sit amet cursus dui metus nec tortor." 
                },
                {
                    headline: "News Story 2",
                    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ante eros, aliquet ac magna et, congue luctus est. Cras et augue imperdiet, faucibus magna non, rutrum eros. Nunc aliquet, odio nec mattis pharetra, nisi tellus hendrerit est, sit amet cursus dui metus nec tortor." 
                }
            ]
        }
    }
    render() {
        var topics = this.state.articles.map(item => {
            return <Topic headline={item.headline} summary={item.summary} />;
        });
        return (
            <div>
                <h2>Headlines</h2>
                <hr />
                <div>
                    {topics}
                </div>
            </div>
        );
    }
}