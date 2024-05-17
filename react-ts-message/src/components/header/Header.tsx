import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Header extends Component {
  render(): React.ReactNode {
    return (
      <header>
        <h1 className="header__notes">NOTES</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/register">REGISTER</NavLink>
            </li>
            <li>
              <NavLink to="/login">LOGIN</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">DASHBOARD</NavLink>
            </li>
            <li>
              <NavLink to="/about_me">ABOUT ME</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
