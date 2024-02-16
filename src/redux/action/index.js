export const LOGIN = "LOGIN";
export const GET_POSTS = "GET_POSTS";

const url = "http://localhost:3010";
const token = sessionStorage.getItem("token");

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
        let data = await response.json();
        // dispatch({
        //   type: LOGIN,
        //   payload: data.token,
        // });
        console.log("token1 " + data.token);
        sessionStorage.setItem("token", data.token);
        console.log(sessionStorage.getItem("token"));
      } else {
        throw new Error();
      }
    } catch (error) {
      alert("errore nella fetch di login " + error);
    }
  };
};



export const getPosts = () => {
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
  

 