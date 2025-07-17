const initialState = {
  coordinates: { longitude: null, latitude: null },
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case 'SET_COORDINATES':
      return { ...state, coordinates: action.payload };
    default:
      return state;
  }
}
