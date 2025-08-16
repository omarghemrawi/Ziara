const initialState = {
  user: null,
  refreshPlaces: false,
};
export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
      };
    case 'SET_PLACES_REFRESH':
      return { ...state, refreshPlaces: action.payload };
    default:
      return state;
  }
}
