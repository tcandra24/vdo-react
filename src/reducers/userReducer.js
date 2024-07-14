export const INITIAL_STATE = {
  users: [],
  loading: false,
  response: {
    message: "",
    success: null,
    errors: null,
  },
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: false,
          errors: action.payload,
        },
      };
    default:
      return state;
  }
};
