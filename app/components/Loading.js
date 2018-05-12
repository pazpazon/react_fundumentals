import React from "react";
import PropTypes from "prop-types";

let styles = {
  content: {
    textAlign: "center",
    fontSize: "25px"
  }
};

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    cursor: PropTypes.string.isRequired,
    cursorMaxRepeat: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired
  }

  static defaultProps = {
    text: "Loading",
    cursor: ".",
    cursorMaxRepeat: 3,
    speed: 300
  }
  
  state = {
      text: this.props.text
  }

  componentDidMount = () => {
    const { text, cursor, speed, cursorMaxRepeat } = this.props;
    let stopper = text.padEnd(
      text.length + cursorMaxRepeat * cursor.length,
      cursor
    );

    this.clearInterval = setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: text }))
        : this.setState(prev => ({ text: prev.text + cursor }));
    }, speed);
  };

  componentWillUnmount() {
    clearInterval(this.clearInterval);
  }

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

export default Loading;
