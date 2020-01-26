import * as ActionTypes from './ActionTypes';
const Promotions = (state = {
  isLoading: true,
  promos: [],
  errMess: null
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return { ...state, isLoading: false, promos: action.payload, errMess: null }
    case ActionTypes.LOADING_PROMOS:
      return { ...state, isLoading: true, promos: [], errMess: null }
    case ActionTypes.PROMOS_FAILD:
      return { ...state, isLoading: false, promos: [], errMess: action.payload }
    default:
      return state;
  }
}
export default Promotions;