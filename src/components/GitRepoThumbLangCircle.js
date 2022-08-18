import React from 'react';

import colors from '../assets/github-colors/colors.json';
import '../css/gitrepothumb.css';

const DEFAULT_LANG_COLOR = '#cccccc';

class GitRepoThumbLangCircle extends React.Component {
  render() {
    if (this.props.languages.length !== 0) {
      var lang_color = DEFAULT_LANG_COLOR;
      if (colors.hasOwnProperty(this.props.languages[0])) {
        lang_color = colors[this.props.languages[0]].color;
      }

      const circleStyle = {
        'backgroundColor': lang_color
      }

      return (
        <div className='thumb-details-repo-lang-container'>
          <div className='thumb-details-repo-lang-circle' style={circleStyle}></div>
          <div className='thumb-details-repo-lang'><b>{this.props.languages[0]}</b></div>
        </div>
      )
    }

    return (<div />);
  }
}

export default GitRepoThumbLangCircle;