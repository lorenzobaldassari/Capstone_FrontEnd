import { useNavigate } from "react-router-dom";

export const LOGIN = "LOGIN";
export const GET_POSTS = "GET_POSTS";

const url = "http://localhost:3010";
// const token = sessionStorage.getItem("token
export const loginAction = (body) => {
  return async (dispatch) => {
    try {
      let response = await fetch(url + "/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        dispatch({
          type: LOGIN,
        });
        let data = await response.json();
        console.log("token " + data.tipo);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("uuid", data.uuid);
        sessionStorage.setItem("tipo", data.tipo);
        sessionStorage.setItem("nome", data.nome);
        sessionStorage.setItem("cognome", data.cognome);
        sessionStorage.setItem("immagine", data.immagine);
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("errore nella fetch di login " + error);
    }
  };
};

export const loginPaginaAction = (body) => {
  return async (dispatch) => {
    try {
      let response = await fetch(url + "/auth/login/pagine", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        dispatch({
          type: LOGIN,
        });
        let data = await response.json();
        console.log("token " + data);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("uuid", data.uuid);
        sessionStorage.setItem("tipo", data.tipo);
        sessionStorage.setItem("nome", data.nome);
        sessionStorage.setItem("cognome", data.cognome);
        sessionStorage.setItem("immagine", data.immagine);

      } else {
        throw new Error();
      }
    } catch (error) {
      alert("errore nella fetch di login " + error);
    }
  };
};

export const getPosts = (token) => {
  return async (dispatch) => {
    try {
      let response = await fetch(url + "/posts", {
        headers: {
          authorization: "bearer " + token,
        },
      });
      if (response.ok) {
        let date = await response.json();
        dispatch({
          type: GET_POSTS,
          payload: date,
        });
      } else throw new Error();
    } catch (error) {
      alert("errore nella fetch di posts " + error);
    }
  };
};
