export const INITIAL_STATE = {
  videos: [],
  video: {},
  loading: false,
  response: {
    message: "",
    success: null,
    errors: null,
  },
};

export const videoReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_VIDEOS":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "FETCH_VIDEOS_SUCCESS":
      return {
        ...state,
        videos: action.payload,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "FETCH_VIDEOS_FAILURE":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: false,
          errors: action.payload,
        },
      };
    case "ADD_VIDEOS":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "ADD_VIDEOS_SUCCESS":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "ADD_VIDEOS_FAILURE":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: false,
          errors: action.payload,
        },
      };
    case "GET_VIDEO":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "GET_VIDEO_SUCCESS":
      return {
        ...state,
        video: action.payload || {},
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "UPDATE_VIDEOS":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "UPDATE_VIDEOS_SUCCESS":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "UPDATE_VIDEOS_FAILURE":
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          success: false,
          errors: action.payload,
        },
      };
    case "DELETE_VIDEOS":
      return {
        ...state,
        loading: true,
        response: { ...state.response, errors: null },
      };
    case "DELETE_VIDEOS_SUCCESS":
      return {
        ...state,
        response: {
          ...state.response,
          success: true,
          errors: null,
        },
      };
    case "DELETE_VIDEOS_FAILURE":
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
