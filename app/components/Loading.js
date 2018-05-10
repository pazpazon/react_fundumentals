import React from 'react';
import PropTypes from 'prop-types';

  
let styles = {
  content: {
    textAlign: 'center',
    fontSize: '25px'
  }
}

class Loading extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: props.text
    };
  }

  componentDidMount = () => {
    let stopper = (
      this.props.text.padEnd(
        this.props.text.length + (this.props.cursorMaxRepeat * this.props.cursor.length), 
        this.props.cursor
    ));

    this.clearInterval = setInterval( () => {
      if (this.state.text === stopper){ 
        this.setState( () => ( { text: this.props.text } ));
      } else {
        this.setState( prev => ( { text: prev.text + this.props.cursor } ));
      }

    }, this.props.speed)

  }

  componentWillUnmount(){
    clearInterval(this.clearInterval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  cursor: PropTypes.string.isRequired,
  cursorMaxRepeat: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  cursor: '.',
  cursorMaxRepeat: 3,
  speed: 300
}

export default Loading;
