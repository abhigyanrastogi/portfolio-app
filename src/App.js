import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './features/auth/Login';
import Dash from './components/Dash';
import WelcomePage from './components/WelcomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<Dash />} >
          
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
