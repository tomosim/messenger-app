import React from "react";
import * as api from "../api";
import moment from "moment";

class Messagebox extends React.Component {
  state = { newMessage: "" };

  render() {
    return (
      <div className="messageSendBox">
        <input
          id="inputBox"
          value={this.state.newMessage}
          placeholder="your message here..."
          onChange={this.handleInput}
        />
        <button id="sendButton" onClick={this.handleClick}>
          Send
        </button>
      </div>
    );
  }

  handleInput = e => {
    this.setState({ newMessage: e.target.value });
  };

  handleClick = () => {
    api.postMessage({
      text: this.state.newMessage,
      userName: this.props.userName,
      timestamp: moment().format()
    });

    this.setState({ newMessage: "" });
  };
}

export default Messagebox;
