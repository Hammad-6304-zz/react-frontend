import * as ActionTypes from './ActionTypes';
const Comments = (state = {
    isLoading: true,
    comments: [],
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return { ...state, isLoading: false, errMess: null, comments: state.comments.concat(comment) }
        case ActionTypes.DISPLAY_COMMENTS:
            return { ...state, isLoading: false, comments: action.payload, errMess: null }
        case ActionTypes.FAILD_COMMENTS:
            return { ...state, isLoading: false, errMess: action.payload }
        default:
            return state;
    }
}
export default Comments;