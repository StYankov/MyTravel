import {
    SET_USER_IN_STATE,
    USER_LOGOUT,
    REMOVE_AUTH_ERRORS,
    ADD_FAVOURITES_TO_STATE,
    REMOVE_LINE_SUCCESS,
    VOTE_SUCCESS
} from '../Actions/UserActions';

export default function userReducer(state = null, action){
    switch (action.type){
    case SET_USER_IN_STATE: {
        return {
            ...action.user
        };
    }
    case USER_LOGOUT: {
        return null;
    }
    case ADD_FAVOURITES_TO_STATE: {
        return {
            ...state,
            ...action.user
        };
    }
    case REMOVE_LINE_SUCCESS: {
        return {
            ...state,
            ...action.user
        }
    }
    default: return state;
    }
}
