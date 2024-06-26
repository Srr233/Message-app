import { Component } from "react";
import { NotesWorkflow } from "../NotesWorkflow/NotesWorkflow";
import { Link } from "react-router-dom";
import { IsLogged } from "../../interfaces/IsLogged";

export class Dashboard extends Component<
  Pick<IsLogged, "isLogged">,
  { access: string | null }
> {
  render() {
    const accesToken = localStorage.getItem("access_token");
    if (!accesToken) {
      return (
        <div className="noAccess">
          <p>
            You do not have rights for access. <Link to="/login">Login</Link> to
            create future!
          </p>
        </div>
      );
    }

    return (
      <div className="main__wrapper">
        <div className="wrapper">
          <div className="dashboard__wrapper">
            <div className="dashboard__panel">
              <div className="dashboard__workflow__wrapper">
                <NotesWorkflow />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
