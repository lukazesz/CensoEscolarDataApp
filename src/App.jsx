import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Instituicoes from './pages/Instituicoes';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instituicoes" element={<Instituicoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
