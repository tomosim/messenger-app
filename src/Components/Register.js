import React from "react";
import { auth } from "../dbInitialise";
import * as api from "../api";

class Register extends React.Component {
  state = {
    user: { userName: "", email: "", password: "", avatarURL: "" },
    passwordIsInvalid: false,
    errMsg: ""
  };

  inputHandler = e => {
    this.setState({
      user: { ...this.state.user, [e.target.className]: e.target.value }
    });
  };

  isValidPassword = password =>
    /^\w{6,}/.test(password)
      ? this.setState({ passwordIsInvalid: true })
      : this.setState({ passwordIsInvalid: false });

  clickHandler = () => {
    auth
      .createUserWithEmailAndPassword(
        this.state.user.email,
        this.state.user.password
      )
      .then(({ uid }) => {
        return api.createUser({
          userName: this.state.user.userName,
          UID: uid,
          email: this.state.user.email
        });
      })
      .then(() => {
        this.props.register(this.state.user.userName);
      })
      .catch(err => this.setState({ errMsg: err.message }));
  };

  render() {
    return (
      <div className="register">
        <input
          className="userName"
          value={this.state.userName}
          placeholder="userName"
          onChange={this.inputHandler}
        />
        <br />
        <br />
        <input
          className="email"
          value={this.state.email}
          placeholder="email"
          onChange={this.inputHandler}
        />
        <br />
        <br />
        <input
          className="password"
          value={this.state.password}
          placeholder="password"
          type="password"
          onChange={this.inputHandler}
        />
        <br />
        <br />
        <button onClick={this.clickHandler}>register</button>
        <br />
        <br />
        {this.state.errMsg && <p id="err">{this.state.errMsg}</p>}
        <hr />
        <p>Already have an account?</p>
        <button onClick={this.props.toggleLoginRegister}>Login</button>
      </div>
    );
  }
}

export default Register;
