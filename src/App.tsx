import './App.css';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <h1>STARWARS HEROES</h1>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
