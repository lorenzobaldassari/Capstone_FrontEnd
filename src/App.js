import "bootstrap/dist/css/bootstrap.min.css";
import "./Sass/Custom/custom_bootstrap.css";
import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomNavbar from "./Components/Navbar";
import LoginPagina from "./Components/LoginPagine";
import Wellcome from "./Components/Posts/Wellcome";
import Pagine from "./Components/Pagine/Pagine";
import ProfiloSingolaPagina from "./Components/Pagine/PorfiloSingolaPagina";
import Utenti from "./Components/Utenti/Utenti";
import PaginaSingoloUtente from "./Components/Utenti/PaginaSingoloUtente";
import PaginaLoggata from "./Components/Pagine/PaginaLoggata";
import UtenteLoggato from "./Components/Utenti/UtentoLoggato";
import CustomFooter from "./Components/CustomFooter";
import CreatePaginaModal from "./Components/Pagine/CreatePaginaModal";

function App() {
  return (
    <div className="App fw-regular bg-third">
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="" Component={Login} />
          <Route path="/wellcome" Component={Wellcome} />
          <Route path="/paginaLogin" Component={LoginPagina} />
          <Route path="/register" Component={Register} />
          <Route path="/home" Component={Home} />
          <Route path="/pagine" Component={Pagine} />
          <Route path="/utenti" Component={Utenti} />
          <Route path="/pagina/me" Component={PaginaLoggata} />
          <Route path="/utente/me" Component={UtenteLoggato} />
          <Route path="/singolaPagina/:id" Component={ProfiloSingolaPagina} />
          <Route path="/singoloUtente/:id" Component={PaginaSingoloUtente} />
          <Route path="/creazionePagina" Component={CreatePaginaModal} />
        </Routes>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
