import React from "react";
import * as api from "../api";
import { generate } from "short-id";

class Messages extends React.Component {
  state = {
    messages: []
  };

  formatTimestamps(timestampString) {
    const numberString = timestampString.replace(/\D/g, "").slice(0, -4);

    return Number(numberString);
  }

  componentDidMount() {
    api.listenForNewMessages(newMessages => {
      let formattedMessages = newMessages.map(message => {
        return {
          ...message,
          timestamp: this.formatTimestamps(message.timestamp)
        };
      });

      this.setState({
        messages: [...this.state.messages, ...formattedMessages]
      });
    });
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "smooth" });
  };

  compareTimestamps(a, b) {
    if (a.timestamp < b.timestamp) return -1;
    if (a.timestamp > b.timestamp) return 1;
    return 0;
  }

  render() {
    return (
      <div className="messageContainer">
        {this.state.messages.sort(this.compareTimestamps).map(message => {
          return this.props.userName === message.userName ? (
            <div className="messageBox shadow me" key={generate()}>
              <span className="user">{message.userName}: </span> {message.text}
            </div>
          ) : message.for === message.userName ? (
            <div className="messageBox shadow private" key={generate()}>
              <span className="user">{message.userName}: </span>
              {message.text}
            </div>
          ) : (
            <div className="messageBox shadow them" key={generate()}>
              <span className="user">{message.userName}: </span>
              {message.text}
            </div>
          );
        })}
        <div
          ref={el => {
            this.el = el;
          }}
        />
      </div>
    );
  }
}

export default Messages;
