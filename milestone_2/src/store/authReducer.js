import { MOCK_USERS } from "../../constants/mockData";

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;