import React, { Component } from "react";
import * as api from "./api";
import Chatroom from "./Components/Chatroom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import "./App.css";
import { auth } from "./config";

class App extends Component {
  state = { userName: "", login: true };

  componentDidMount() {
    api.listenToUsers(updatedUsers => {
      let newUsers = { ...this.state.users };
      updatedUsers.forEach(({ message, user }) => {
        newUsers = { ...newUsers, [user.userName]: user };
      });
      this.setState({ users: newUsers });
    });
    localStorage
      ? this.setState({
          userName: localStorage.userName
        })
      : this.setState({ userName: "" });
  }

  login = userName => {
    this.setState({ userName });
    localStorage.setItem("userName", userName);
  };

  toggleLoginRegister = () => {
    this.state.login
      ? this.setState({ login: false })
      : this.setState({ login: true });
  };

  register = userName => {
    this.setState({ userName });
  };

  logout = () => {
    auth
      .signOut()
      .then(() => api.logout(this.state.userName))
      .then(() => {
        this.setState({ userName: "", login: true });
        localStorage.setItem("userName", "");
      })
      .catch(console.log);
  };

  render() {
    return (
      <div className="App">
        {!this.state.userName &&
          this.state.login && (
            <div id="loginCard" className="shadow">
              <Login
                toggleLoginRegister={this.toggleLoginRegister}
                login={this.login}
              />{" "}
            </div>
          )}
        {!this.state.userName &&
          !this.state.login && (
            <div id="loginCard" className="shadow">
              <Register
                toggleLoginRegister={this.toggleLoginRegister}
                register={this.register}
              />
            </div>
          )}
        {this.state.userName && (
          <Chatroom userName={this.state.userName} logout={this.logout} />
        )}
      </div>
    );
  }
}

export default App;
