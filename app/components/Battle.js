import React from 'react';
import PropTypes from 'prop-types';

const PlayerPreview = (props) => {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={props.username + 'avatar'}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button className='reset'
        onClick={() => props.onReset(props.id)}
      >
        reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}
class PlayerInput extends React.Component{
  state = {username: ''};

  handleChange = (event) => {
    let val = event.target.value;
    this.setState(() => ({username: val}))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render(){
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          autoComplete='off'
          type='text'
          className=''
          value={this.state.username}
          onChange={this.handleChange}>
        </input>
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
class Battle extends React.Component {

  state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null
  };
  

  handleSubmit = (id, username) => {
    this.setState(() => {
      let newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  handleReset = (id) => {
    this.setState( () => {
      return {
        [id + 'Name']: "",
        [id + 'Image']: null,
      }
    })
  }

  render() {
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return <div className="row">
        {!playerOneName && 
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit} />
        }
        
        {playerOneImage !== null &&
          <PlayerPreview 
            id='playerOne'
            avatar={playerOneImage}
            username={playerOneName}
            onReset={() => this.handleReset('playerOne')}
          />
        }
        
        {!playerTwoName && 
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit} />
        }
        
        {playerTwoImage !== null &&
          <PlayerPreview 
            id='playerTwo'
            avatar={playerTwoImage}
            username={playerTwoName}
            onReset={() => this.handleReset('playerTwo')}
          />
        }
        
      </div>;
  }
}

export default Battle;
