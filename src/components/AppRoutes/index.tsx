import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../services/utils/routes';
import HeroList from '../HeroList';
import HeroCard from '../HeroCard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<HeroList />}
      />
      <Route
        path={ROUTES.HERO}
        element={<HeroCard />}
      />
    </Routes>
  );
};

export default AppRoutes;
