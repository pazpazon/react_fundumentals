import React from 'react';
import PropTypes from 'prop-types';

const PlayerPreview = props => {
  return (
    <div>
      
      <div className="column">
        <img
          className="avatar"
          src={props.avatar}
          alt={props.username + "avatar"}
        />
        <h2 className="username">@{props.username}</h2>
      </div>
      <div className='fix'>
        <div className='info-list'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default PlayerPreview;