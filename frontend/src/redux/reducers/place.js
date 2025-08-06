const initialState = {
  all: [],
  restaurant: [],
  shop: [],
  hotel: [],
  acticity: [],
  religious: [],
  touristic: [],
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
        acticity: action.payload,
      };
    case 'SET_RELIGIOUS_PALCES':
      return {
        ...state,
        religious: action.payload,
      };
    case 'SET_TOURISTIC_PLACES':
      return {
        ...state,
        touristic: action.payload,
      };
    default:
      return state;
  }
}
