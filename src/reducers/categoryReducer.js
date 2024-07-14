export const INITIAL_STATE = {
  categories: [],
  loading: false,
  response: {
    message: "",
    success: null,
    errors: null,
  },
};

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "FETCH_CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: false,
          errors: action.payload,
        },
      };
    case "ADD_CATEGORIES":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "ADD_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "ADD_CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: false,
          errors: action.payload,
        },
      };
    case "GET_CATEGORY":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "GET_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "UPDATE_CATEGORIES":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "UPDATE_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "UPDATE_CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: false,
          errors: action.payload,
        },
      };
    case "DELETE_CATEGORIES":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "DELETE_CATEGORIES_SUCCESS":
      return {
        ...state,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "DELETE_CATEGORIES_FAILURE":
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
