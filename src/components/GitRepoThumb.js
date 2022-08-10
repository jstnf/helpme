import React from 'react';

const GitUrlParse = require("git-url-parse");

class GitRepoThumb extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            parsed: {
                status: 0
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.urlText != this.props.urlText) {
            this.updateAndNotify();
        }
    }

    updateAndNotify() {
        this.setState({
            parsed: {

            }
        })
    }

    render() {
        return (
            <p>Hi!</p>
        );
    }
}

export default GitRepoThumb;