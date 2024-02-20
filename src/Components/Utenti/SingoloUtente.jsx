import { Link } from "react-router-dom";

const SingoloUtente = ({ utente }) => {
  console.log(utente);
  return (
    <>
      <div className="bg-warning p-4">
        <div>
          <img src={utente.immagine_di_profilo} alt="immagine dell'utente" />
        </div>
        <Link pagine={utente} to={"/singoloUtente/" + utente.utente_uuid}>
          <h4>{utente.nome}</h4>
          <h4>{utente.cognome}</h4>
        </Link>
        <p>{utente.email}</p>
      </div>
    </>
  );
};

export default SingoloUtente;
