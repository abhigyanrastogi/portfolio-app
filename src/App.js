import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './features/auth/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
