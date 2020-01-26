import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../Shared/baseUrls';
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, author, rating, comment) => (dispatch) => {
    var newComment = {
        dishId: dishId,
        author: author,
        rating: rating,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    fetch(baseUrl + "comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                var err = new Error(`Error ${res.status} : ${res.statusText}`);
                throw err
            }
        })
        .then(res => res.json())
        .then(res => dispatch(addComment(res)))
        .catch(err => console.log(err));
}
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseUrl + "dishes")
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let err = new Error(`Error  ${response.status} : ${response.statusText}`);
                throw err;
            }
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(err => dispatch(dishesLoadingFaild(err.message)));
}
export const fetchPromos = () => (dispatch) => {
    dispatch(loadingPromos());
    fetch(baseUrl + "promotions")
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                var err = new Error(`Error ${res.status} : ${res.statusText}`);
                throw err;
            }
        })
        .then(res => res.json())
        .then(com => dispatch(addPromos(com)))
        .catch(err => dispatch(faildPromos(err.message)));
}
export const fetchComments = () => (dispatch) => {
    fetch(baseUrl + "comments")
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                var err = new Error(`Error ${res.status} : ${res.statusText}`);
                throw err;
            }
        })
        .then(res => res.json())
        .then(com => dispatch(addComments(com)))
        .catch(err => dispatch(fetchCommentsFaild(err.message)));
}
export const fetchLeaders = () => (dispatch) => {
    dispatch(loadingLeaders());
    fetch(baseUrl + 'leaders')
        .then(
            (res) => {
                if (res.ok) {
                    return res;
                }
                else {
                    var err = new Error(`Error ${res.status} : ${res.statusText}`);
                    throw err;
                }
            }
        )
        .then(
            (res) => res.json()
        )
        .then((res) => dispatch(addLeaders(res)))
        .catch(err => dispatch(faildLeaders(err.message)))
}
export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => {
    const feedback = {
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message,
        date:new Date().toISOString()
    };
    fetch(baseUrl + "feedback",{
        method:"POST",
        body:JSON.stringify(feedback),
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"same-origin"
    })
        .then(res => {
            if (res.ok) {
                return res;
            }
            else {
                var err = new Error(`Error ${res.status} : ${res.statusText}`);
                throw err;
            }
        }
        )
        .then(res => res.json())
        .then(res => alert(JSON.stringify(res)))
        .catch(err => console.log(err) || alert(err));

}
const addLeaders = (leaders) => ({
    type: ActionTypes.ADDING_LEADERS,
    payload: leaders
})
const loadingLeaders = () => ({
    type: ActionTypes.LOADING_LEADERS
})
const faildLeaders = (errMess) => ({
    type: ActionTypes.FAILD_LEADERS,
    payload: errMess
})
const addComments = (com) => ({
    type: ActionTypes.DISPLAY_COMMENTS,
    payload: com
});
const fetchCommentsFaild = (errMess) => ({
    type: ActionTypes.FAILD_COMMENTS,
    payload: errMess
})
const dishesLoading = () => ({
    type: ActionTypes.LOADING_DISHES,
});
const dishesLoadingFaild = (errMess) => ({
    type: ActionTypes.LOADING_FAILED,
    payload: errMess
});
const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});
const addPromos = promos => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})
const loadingPromos = () => ({
    type: ActionTypes.LOADING_PROMOS
})
const faildPromos = errMess => ({
    type: ActionTypes.PROMOS_FAILD,
    payload: errMess
})