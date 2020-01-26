import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import {initialFeadback} from './forms';
import Comments from './comments';
import Dishes from './dishes';
import Leaders from './leaders';
import Promotions from './promotions';
import thunk from 'redux-thunk';
export const ConfigureStore = () => {
    return createStore(combineReducers({
        comments: Comments,
        dishes: Dishes,
        leaders: Leaders,
        promotions: Promotions,
        ...createForms({feedback:initialFeadback})
    }), applyMiddleware(thunk));
}