import "bootstrap/dist/css/bootstrap.min.css";
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
