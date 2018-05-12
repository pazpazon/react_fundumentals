import React from 'react';
import PropTypes from 'prop-types';

const PlayerPreview = ({avatar, username, children}) => {
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={avatar}
          alt={username + "avatar"}
        />
        <h2 className="username">@{username}</h2>
      </div>
      <div className='fix'>
        <div className='info-list'>
          {children}
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