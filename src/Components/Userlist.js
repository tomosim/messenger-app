import React from "react";
import * as api from "../api";

class Userlist extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    api.listenToUsers(newUsers => {
      const users = newUsers.map(newUser => {
        return {
          userName: newUser.user.userName,
          UID: newUser.user.UID,
          loggedIn: newUser.user.loggedIn
        };
      });

      this.setState({
        users: [...this.state.users, ...users]
      });
    });
  }

  render() {
    return (
      <div className="Users">
        {this.state.users.map(user => (
          <div key={user.UID} className="userBox">
            {user.userName}
            {user.loggedIn ? (
              <span id="loggedIn" role="img" aria-label="blue circle">
                🔵
              </span>
            ) : (
              <span role="img" aria-label="white circle" id="loggedIn">
                ⚪️
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Userlist;
