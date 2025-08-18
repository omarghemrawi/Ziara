

const savedUser = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {userData: savedUser,};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
case "SET_USER": {
  const prev = state.userData || {};
  const next = action.payload || {};

  // دمج مع تجاهل القيم الفارغة/undefined
  const merged = { ...prev };
  for (const [k, v] of Object.entries(next)) {
    if (v !== undefined && v !== null && v !== "") merged[k] = v;
  }

  localStorage.setItem("userData", JSON.stringify(merged));
  return { ...state, userData: merged };
}


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
