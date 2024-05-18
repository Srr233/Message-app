import { Component, ReactNode } from "react";

export class AnimatedBlock extends Component {
  render(): ReactNode {
    return (
      <div className="area">
        <ul className="circles">
          <li>Made by @Sr233</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li>
            NestJS <br /> ReactTS <br />
            NodeJS
          </li>
          <li></li>
          <li></li>
          <li>
            Passport <br /> JWT tokens <br />
            Docker
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}
