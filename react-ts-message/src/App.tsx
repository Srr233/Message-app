import "./App.css";
import { Header } from "./components/header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AnimatedBlock } from "./components/animate/AnimateBackground";
import { FormEnter } from "./components/form/Form";
import { loginOptions, registerOptions } from "./contents/loginRegisterContent";
import { Dashboard } from "./containers/Dashboard/Dashboard";
import { Footer } from "./components/footer/Footer";
import { Component, ReactNode } from "react";
import { LoadingHOC } from "./components/HOCs/LoadingHOC";
import { isUserLogged } from "./services/isUserLogged";
import { IsLogged } from "./interfaces/IsLogged";

class MyApp extends Component<IsLogged, {}> {
  render(): ReactNode {
    return (
      <BrowserRouter>
        <Header isLogged={this.props.isLogged} />
        <Routes>
          {this.props.isLogged ? (
            <>
              <Route
                path="/"
                element={<Dashboard isLogged={this.props.isLogged} />}
              />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={
                  <FormEnter
                    {...loginOptions}
                    setLoggedStatus={this.props.setLoggedStatus}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <FormEnter
                    {...registerOptions}
                    setLoggedStatus={this.props.setLoggedStatus}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={<Dashboard isLogged={this.props.isLogged} />}
              />
            </>
          )}
        </Routes>
        <AnimatedBlock />
        <Footer />
      </BrowserRouter>
    );
  }
}

const AppLoadingHOC = LoadingHOC("isLogged")(MyApp);
export class App extends Component<{}, { isLogged?: boolean }> {
  state: Readonly<{ isLogged?: boolean }> = {
    isLogged: undefined,
  };
  componentDidMount = async (): Promise<void> => {
    const isLogged = await isUserLogged();
    this.setState({ isLogged: isLogged });
  };

  setLogged = (logged: boolean) => {
    this.setState({ isLogged: logged });
  };
  render(): ReactNode {
    return (
      <AppLoadingHOC
        isLogged={this.state.isLogged}
        setLoggedStatus={this.setLogged}
      />
    );
  }
}

export default App;
