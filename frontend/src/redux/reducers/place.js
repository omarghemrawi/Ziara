const initialState = {
  all: [],
  restaurant: [],
  shop: [],
  hotel: [],
  acticityPlace: [],
};
export default function places(state = initialState, action) {
  switch (action.type) {
    case 'SET_PLACES':
      return {
        ...state,
        all: action.payload,
      };
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurant: action.payload,
      };
    case 'SET_SHOPS':
      return {
        ...state,
        shop: action.payload,
      };
    case 'SET_HOTELS':
      return {
        ...state,
        hotel: action.payload,
      };
    case 'SET_ACTIVITY_PLACES':
      return {
        ...state,
        acticityPlace: action.payload,
      };
    default:
      return state;
  }
}
