import React, { ChangeEvent, Component } from "react";
import { EnterLoginPass } from "../../interfaces/EnterLoginPass";
import { EnterRequest } from "../../interfaces/EnterRequest";
import { FormInfo } from "../../interfaces/FormInfo";
import { IsLogged } from "../../interfaces/IsLogged";

export class FormEnter extends Component<
  EnterRequest & FormInfo & Pick<IsLogged, "setLoggedStatus">,
  EnterLoginPass
> {
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

  signIn = async (
    e: React.MouseEvent<HTMLButtonElement>,
    login: string,
    password: string
  ): Promise<void> => {
    const result = await this.props.requestFunc(e, login, password);
    this.props.setLoggedStatus(result);
  };

  render() {
    const { login, password } = this.state;
    const { actionTitle, buttonText, textAction } = this.props;

    return (
      <div className="wrapper">
        <div className="register__wrapper">
          <h2>{actionTitle}</h2>
          <span>{textAction}</span>
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
            <button onClick={(e) => this.signIn(e, login, password)}>
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
