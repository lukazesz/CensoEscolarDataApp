import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import InstituicaoEnsino from "./views/InstituicaoEnsino";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/instituicoes"
          element={<InstituicaoEnsino />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;