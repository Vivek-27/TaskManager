import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) setLoggedIn(true);
  }, [user]);

  return <>{loggedIn ? <Home /> : <Auth />}</>;
}

export default App;
