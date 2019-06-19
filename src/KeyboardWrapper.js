import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class KeyboardWrapper extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.stateToIgnore !== this.props.stateToIgnore) return false;
    else return true;
  }

  render() {
    return <Keyboard ref={r => (this.keyboardRef = r)} {...this.props} />;
  }
}

export default KeyboardWrapper;
