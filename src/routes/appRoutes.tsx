import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Marcador from '../pages/marcador';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AtrapalosATodos" element={<Marcador />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
