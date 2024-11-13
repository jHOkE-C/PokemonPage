import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Marcador from '../pages/marcador';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marcador" element={<Marcador />} />
    </Routes>
  );
};

export default AppRoutes;
