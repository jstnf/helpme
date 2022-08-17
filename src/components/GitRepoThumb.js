import React from 'react';

import '../css/loading.css';

const GitUrlParse = require("git-url-parse");
const IsGitHubUrl = require("is-github-url");

// Wait this amount of milliseconds after a URL change to do anything
const TYPE_COUNTDOWN_MILLIS = 1000;

class GitRepoThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0, 
      time: {}, 
      milliseconds: 0
    };

    // https://stackoverflow.com/questions/40885923/countdown-timer-in-react
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.urlText !== this.props.urlText) {
      this.updateAndNotify();
    }
  }

  // When a url change is detected, we want to set a timer to 1 second
  // If a url change occurs while this timer is above 0 seconds, we reset it back to 1 second
  // When the timer hits 0, we send a request to GitHub API to get repository information
  // This is to prevent a request being sent every time a url change occurs

  updateAndNotify() {
    if (this.props.urlText.length !== 0) {
      // Triggers re-render
      this.setState({status: 1, milliseconds: TYPE_COUNTDOWN_MILLIS});
      this.startTimer();
    } else {
      this.setState({status: 0});
    }
  }

  startTimer() {
    // Start a new timer if one does not already exist or the previous timer has expired
    // If a timer is already going, this does nothing
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 100);
    }
  }

  countDown() {
    // Remove 100ms
    //console.log(this.state.milliseconds);
    let ms = this.state.milliseconds - 100;
    this.setState({
      milliseconds: ms
    });

    // Check if zero
    if (ms === 0) {
      clearInterval(this.timer); // Stop the timer
      this.timer = 0; // Reset the timer

      // Check if nothing is currently entered
      // If there is no URL to check, then do nothing and just return
      if (this.state.status === 0) return;

      // Get repo information!
      // Check if valid GitHub URL with repository
      if (!IsGitHubUrl(this.props.urlText, {repository: true})) {
        // Tell the user this URL is invalid
        this.setState({status: 3, error_msg: 'Invalid GitHub URL'});
        return;
      }

      // Now, do the actual processing
      let result = GitUrlParse(this.props.urlText);
      //console.log(result);
      let git_api_url = 'https://api.github.com/repos/' + result.full_name;
      fetch(git_api_url)
        .then(response => response.json())
        .then(repo_data => {
          if (typeof repo_data.message !== 'undefined') {
            // Invalid repository.
            this.setState({status: 3, error_msg: 'Invalid repository - is the repo private?'})
            return;
          }

          // Repository hit.
          // Fetch languages of the repository
          fetch(git_api_url + '/languages')
            .then(response => response.json())
            .then(language_data => {
              this.setState({status: 2, thumbnail: this.prepareThumbnail(repo_data, language_data)});
            })
            .catch(function() {
              // The fetch failed (connection issues??)
              this.setState({status: 3, error_msg: 'Connection to GitHub failed!'})
            })
        })
        .catch(function() {
          // The fetch failed (connection issues??)
          this.setState({status: 3, error_msg: 'Connection to GitHub failed!'})
        });
    }
  }

  prepareThumbnail(repo, languages) {
    let thumbnail = {};
    thumbnail.name = repo.full_name;
    thumbnail.description = repo.description;
    thumbnail.avatar = repo.avatar_url;
    thumbnail.stars = repo.stargazers_count;
    thumbnail.watchers = repo.watchers_count;
    thumbnail.languages = [];

    Object.keys(languages).forEach(key => {
      thumbnail.languages.push(key); // Should insert the languages in order of count
    });
    return thumbnail;
  }

  render() {
    // status 0: Nothing is entered
    if (this.state.status === 1) {
      return (
        <div>
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
      )
    } else if (this.state.status === 2) {
      // We have a repository fetched and ready    
      return (
        <p>{this.state.thumbnail.name}</p> // TODO: handle thumbnail!
      );
    } else if (this.state.status === 3) {
      // Error occured when resolving repository  
      return (
        <p>ERROR: {this.state.error_msg}</p>
      );
    }
  }
}

export default GitRepoThumb;