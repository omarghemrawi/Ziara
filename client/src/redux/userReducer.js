

const savedUser = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  userData: savedUser,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };

    case "CLEAR_USER":
      localStorage.removeItem("userData");
      return {
        ...state,
        userData: null,
      };

    default:
      return state;
  }
};
