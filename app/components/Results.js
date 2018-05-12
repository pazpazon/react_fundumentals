import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import qs from "query-string";

import {battle} from "../utils/api";
import PlayerPreview from "./PlayerPreview";
import Loading from './Loading';

const Profile = ({info}) => {
  return (
    <PlayerPreview
      avatar={info.avatar_url}
      username={info.login}
    >
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

const Player = ({label, score, profile}) => {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>score: {score}</h3>
      <Profile info={profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  componentDidMount = async () => {
    const { playerOneName, playerTwoName } = qs.parse(this.props.location.search);
    let winner, loser;

    try {
      [winner, loser] = await battle([playerOneName, playerTwoName]);
    } catch(err) {
      console.warn(err);
    }

    if (!winner || !loser) {
      return this.setState(() => ({
        error: `Looks like there's an error, check network connetion,and wether both users exist on github...`,
        loading: false
      }));
    }
    return this.setState(() => ({ winner, loser, loading: false, error: null }));
  }

  render() {
    let { error, winner, loser, loading } = this.state;

    if (loading) {
      return (
        <Loading/>
      );
    }
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }
    return (
      <div>
        <div className='row'>
          <Player 
            label='Winner'
            score={winner.score}
            profile={winner.profile}
          />
          <Player 
            label='Loser'
            score={loser.score}
            profile={loser.profile}
          />
        </div>
        <div className="debug">
          <pre>
            <code>{JSON.stringify([winner, loser], null, 2)}</code>
          </pre>
        </div>
      </div>
    )
  }
}

export default Results;
