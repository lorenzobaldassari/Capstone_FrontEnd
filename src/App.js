import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomNavbar from "./Components/Navbar";
import LoginPagina from "./Components/LoginPagine";
import Wellcome from "./Components/Posts/Wellcome";
import Profilo from "./Components/Profilo/Profilo";
import ProfiloPagina from "./Components/Profilo/ProfiloPagina";
import Pagine from "./Components/Posts/Pagine/Pagine";
import ProfiloSingolaPagina from "./Components/Profilo/PorfiloSingolaPagina";
import Utenti from "./Components/Utenti/Utenti";
import SingoloUtente from "./Components/Utenti/SingoloUtente";
import PaginaSingoloUtente from "./Components/Utenti/PaginaSingoloUtente";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="" Component={Login} />
          <Route path="/wellcome" Component={Wellcome} />
          <Route path="/paginaLogin" Component={LoginPagina} />
          <Route path="/register" Component={Register} />
          <Route path="/home" Component={Home} />
          {/* <Route path="/profilo/:id" Component={Profilo} /> */}
          {/* <Route path="/profiloPagina/:id" Component={ProfiloPagina} /> */}
          <Route path="/pagine" Component={Pagine} />
          <Route path="/utenti" Component={Utenti} />
          <Route path="/singolaPagina/:id" Component={ProfiloSingolaPagina} />
          <Route path="/singoloUtente/:id" Component={PaginaSingoloUtente} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
