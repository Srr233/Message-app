import "./App.css";
import { Header } from "./components/header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
