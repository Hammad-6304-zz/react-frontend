import * as ActionTypes from './ActionTypes';
const Dishes = (state = {
  isLoading: true,
  errMess: null,
  dishes: []
}, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_DISHES:
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    case ActionTypes.LOADING_FAILED:
      return { ...state, isLoading: false, dishes: [], errMess: action.payload };
    case ActionTypes.ADD_DISHES:
      return { ...state, isLoading: false, errMess: null, dishes: action.payload };
    default:
      return state;
  }
}
export default Dishes;