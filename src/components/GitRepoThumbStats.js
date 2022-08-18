import React from 'react';
import {EyeIcon, StarIcon} from '@primer/octicons-react';

class GitRepoThumbStats extends React.Component {
  render() {
    return (
      <div className='thumb-stats-container'>
        <div className='thumb-stats-child'><StarIcon size={15} verticalAlign='middle' fill='#333' /></div>
        <div className='thumb-stats-child thumb-stats-label'>{this.props.stars}</div>
        <div className='thumb-stats-child'><EyeIcon size={15} verticalAlign='middle' fill='#333' /></div>
        <div className='thumb-stats-child thumb-stats-label'>{this.props.watchers}</div>
      </div>
    );
  }
}

export default GitRepoThumbStats;