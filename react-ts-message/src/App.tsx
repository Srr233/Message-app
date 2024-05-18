import "./App.css";
import { Header } from "./components/header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Register } from "./components/register/Register";
import { AnimatedBlock } from "./components/animate/AnimateBackground";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <AnimatedBlock />
      </BrowserRouter>
    </>
  );
};

export default App;
