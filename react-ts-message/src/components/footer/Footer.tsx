import { Component, ReactNode } from "react";
import { TELEGRAM_NAME, TELEPHONE_NUMBER } from "../../constants";

export class Footer extends Component {
  render(): ReactNode {
    return (
      <footer className="footer">
        <div className="wrapper">
          <div className="footer__left">
            <div className="contact">
              <h3>Sergey Alexandrovich</h3>
              <a href={`tel:${TELEPHONE_NUMBER}`}>+375 29 127 07 09</a>
              <a href={TELEGRAM_NAME}>@Saargolan</a>
            </div>
          </div>
          <div className="footer__right">
            <div className="footer__stack">
              <p>ReactTS, NestJS, NodeJS, JWT, PostgreSQL, TypeScript</p>
            </div>
            <div className="footer__rep">
              <a href="https://github.com/Srr233/Message-app.git">
                Git Repository
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
