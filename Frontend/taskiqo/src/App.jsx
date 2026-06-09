import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import "./components/Styles/App.css";
import "./components/Styles/logo.css";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
