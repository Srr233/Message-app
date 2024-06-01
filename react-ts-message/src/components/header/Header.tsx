import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { IsLogged } from "../../interfaces/IsLogged";
export class Header extends Component<Pick<IsLogged, "isLogged">, {}> {
  render(): React.ReactNode {
    return (
      <header>
        <div className="wrapper">
          <h1 className="header__notes">NOTES</h1>
          <nav>
            <ul>
              {this.props.isLogged ? (
                <>
                  <li>
                    <NavLink to="/">DASHBOARD</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/">REGISTER</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">LOGIN</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard">DASHBOARD</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
