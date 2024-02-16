import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CustomNavbar from './Components/Navbar';

function App() {

return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar/>
        <Routes>
          <Route path='' Component={Login}/>
          <Route path='/register' Component={Register}/>
          <Route path='/home'Component={Home}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;