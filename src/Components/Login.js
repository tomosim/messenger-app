import React from "react";
import { auth } from "../config";
import * as api from "../api";

class Login extends React.Component {
  state = {
    user: { email: "", userName: "", password: "" },
    hidden: false,
    errMsg: ""
  };

  inputHandler = e => {
    this.setState({
      user: { ...this.state.user, [e.target.className]: e.target.value }
    });
  };

  clickHandler = () => {
    api
      .getEmailFromUserName(this.state.user.userName)
      .then(email =>
        auth.signInWithEmailAndPassword(email, this.state.user.password)
      )
      .then(() => this.props.login(this.state.user.userName))
      .catch(err => this.setState({ errMsg: err.message }));
  };

  render() {
    return (
      <div className="login">
        <input
          hidden={this.state.hidden}
          className="userName"
          value={this.state.email}
          placeholder="username"
          onChange={this.inputHandler}
        />
        <br />
        <br />
        <input
          hidden={this.state.hidden}
          className="password"
          value={this.state.password}
          placeholder="password"
          type="password"
          onChange={this.inputHandler}
        />
        <br />
        <br />
        <button hidden={this.state.hidden} onClick={this.clickHandler}>
          login
        </button>
        <br />
        <br />
        {this.state.errMsg && <p id="err">{this.state.errMsg}</p>}
        <hr />
        <p>New user?</p>
        <button onClick={this.props.toggleLoginRegister}>Register Here!</button>
      </div>
    );
  }
}

export default Login;
