import React from 'react';

import { Link } from 'react-router-dom';
import GitRepoThumb from '../components/GitRepoThumb';

class PageHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { urlText: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ urlText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO: do submit and go to next page
  }

  componentDidCatch(error, info) {
    // TODO
  }

  render() {
    return (
      <div className='Home'>
        <header className='Home-header'>
          <h1>helpme 👍</h1>
        </header>
        <div>
          <p>Generate, edit, and polish a README file for any GitHub repository.</p>
          <p>Enter a URL to your GitHub repo to get started.</p>
        </div>
        <div className='input-container'>
          <form className='gh-form' onSubmit={this.handleSubmit}>
            <input className='gh-input' type='search' placeholder='ex: https://github.com/jstnf/helpme' value={this.state.value} onChange={this.handleChange} />
          </form>
          <div className='gh-profile'>
            <GitRepoThumb urlText={this.state.urlText} />
          </div>
        </div>
        <div>
          <p>or <Link to='/editor'>get started without a repository.</Link></p>
        </div>
        <footer>
          <h4>Created by <a href='github.com/jstnf'>Justin F</a> with ❤️</h4>
        </footer>
      </div>  
    );
  }
}

export default PageHome;