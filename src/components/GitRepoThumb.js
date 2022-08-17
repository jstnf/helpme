import React from 'react';

import '../css/loading.css';

const GitUrlParse = require("git-url-parse");
const IsGitHubUrl = require("is-github-url");

class GitRepoThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: 0};
  }

  componentDidUpdate(prevProps) {
    if (prevProps.urlText !== this.props.urlText) {
      this.updateAndNotify();
    }
  }

  updateAndNotify() {
    if (this.props.urlText.length !== 0) {
      this.setState({status: 1});
      // Check if valid GitHub URL
      if (IsGitHubUrl(this.props.urlText, {repository: true})) {
        let result = GitUrlParse(this.props.urlText);
      } else {
        this.setState({status: 2});
      }
    } else {
      this.setState({status: 0});
    }
  }

  render() {
    if (this.state.status === 1) {
      return (
        <div>
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      )
    } else if (this.state.status === 2) {
      // Invalid git url and repo
      /*
      return (
        <div>
          <p>Invalid GitHub URL!</p>
        </div>
      );
      */
    } else if (this.state.status === 3) {
      // Valid git url and repo and loaded
    }
  }
}

export default GitRepoThumb;