import cookies from "js-cookie";
import api from "services/api";

export const getData = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_CATEGORIES" });

    try {
      const token = cookies.get("token");

      if (!token) return new Error("Token Not Found");

      api.defaults.headers.common["Authorization"] = token;

      const { data } = await api.get("/api/categories");

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: data.categories });
    } catch (error) {
      dispatch({ type: "FETCH_CATEGORIES_FAILURE", payload: error.message });
    }
  };
};
