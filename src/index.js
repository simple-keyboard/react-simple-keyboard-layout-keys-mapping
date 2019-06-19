import React, { Component } from "react";
import { render } from "react-dom";
import KeyboardWrapper from "./KeyboardWrapper.js";
import LayoutMapping from "./LayoutMapping";

import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboardWrapper.keyboardRef.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />
        <KeyboardWrapper
          ref={r => (this.keyboardWrapper = r)}
          layoutName={this.state.layoutName}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          useMouseEvents={true}
          disableCaretPositioning
          modules={[LayoutMapping]}
          stateToIgnore={this.state.input}
          // LayoutMapping module options
          sourceLayout={"english"} // Matching your physical keyboard
          targetLayout={"english"} // Virtual keyboard layout
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
