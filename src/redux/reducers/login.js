import { LOGIN } from "../action";

const inizialState = {
  auth: false,
};
const loginReducer = (state = inizialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        auth: true,
      };

    default:
      return state;
  }
};

export default loginReducer;

//lo tengo qua ma non viene usato perche non mi serve salvare il token in uno stato mi basta salvarlo nel session storage!
