import React, { ChangeEvent, Component } from "react";
import { EnterLoginPass } from "../../interfaces/EnterLoginPass";
import { BACKEND_URL } from "../../constants";
import { createReadStream } from "fs";
import { Link } from "react-router-dom";

export class Register extends Component<{}, EnterLoginPass> {
  state = {
    login: "",
    password: "",
  };

  handlerOnChangeLogin = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      login: value,
    });
  };

  handlerOnChangePassword = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: value,
    });
  };

  sendData = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { login, password } = this.state;
    try {
      const response = await (
        await fetch(`${BACKEND_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ login, password }),
        })
      ).json();

      alert(
        JSON.stringify({
          response,
        })
      );
    } catch (e: any) {
      console.log(e);
    }
  };
  render() {
    const { login, password } = this.state;

    return (
      <div className="wrapper">
        <div className="register__wrapper">
          <h2>Create account</h2>
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
          <form className="register__form">
            <label htmlFor="Login">
              <span>Login</span>
              <input
                type="text"
                onChange={this.handlerOnChangeLogin}
                value={login}
                placeholder="Email"
              />
            </label>
            <label htmlFor="Password">
              <span>Password</span>
              <input
                type="text"
                onChange={this.handlerOnChangePassword}
                value={password}
                placeholder="Password"
              />
            </label>
            <button onClick={this.sendData}>Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}
