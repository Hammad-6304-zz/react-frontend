import * as ActionTypes from './ActionTypes';
const Leaders = (state = {
  loading: true,
  leaders: [],
  errMess: null
}, action) => {
  switch (action.type) {
    case ActionTypes.LOADING_LEADERS:
      return { ...state, loading: true, leaders: [], errMess: null }
    case ActionTypes.FAILD_LEADERS:
      return { ...state, loading: false, leaders: [], errMess: action.payload }
    case ActionTypes.ADDING_LEADERS:
      return { ...state, loading: false, leaders: action.payload, errMess: null }
    default:
      return state;
  }
}
export default Leaders;
