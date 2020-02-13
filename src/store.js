import { createStore } from "redux";

const defaultState = {
  userName: "Guest",
  accept: false,
  loginError: "",
  mainTable: {
    null: {
      id: null,
      country: null,
      region: null,
      city: null,
      street: null,
      build: null
    }
  },
  singleRow: null
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: action.loginError
      };
    case "LOGIN_SUCSESS":
      return {
        ...state,
        userName: action.userName,
        accept: action.accept
      };
    case "LOG_OUT":
      return {
        userName: "Гость",
        accept: false,
        loginError: "",
        mainTable: {
          null: {
            id: null,
            country: null,
            region: null,
            city: null,
            street: null,
            build: null
          }
        },
        singleRow: null
      };
    case "PUSH_TABLE":
      return {
        ...state,
        mainTable: action.mainTable
      };
    case "PUSH_ROW":
      return {
        ...state,
        // mainTable: {
        //   [action.id]:action.newTable
        // }
        [state.mainTable]:{ [action.id]: action.newTable}
        
      };
      case "DATA_ERROR":
        return{
          ...state,
          dbErr: action.dbErr
        }
    default:
      return state;
  }
}

export const store = createStore(reducer);
