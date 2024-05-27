import "./App.css";
import { Header } from "./components/header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AnimatedBlock } from "./components/animate/AnimateBackground";
import { FormEnter } from "./components/form/Form";
import { loginOptions, registerOptions } from "./contents/loginRegisterContent";
import { Dashboard } from "./containers/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<FormEnter {...loginOptions} />} />
          <Route
            path="/register"
            element={<FormEnter {...registerOptions} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <AnimatedBlock />
      </BrowserRouter>
    </>
  );
};

export default App;
