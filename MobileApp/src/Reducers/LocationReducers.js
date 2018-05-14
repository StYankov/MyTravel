import {
    LOCATION_STATE,
    GET_POSITION_ERROR,
    GET_POSITION_SUCCESS,
    GET_CURRENT_CITY
} from '../Actions/LocationActions';

const defaultState = {
    status: '',
    coords: false,
    error: ''
};

export default function locationReducers(state = defaultState, action){
    switch (action.type){
    case LOCATION_STATE: {
        return {
            ...state,
            status: action.status
        };
    }
    case GET_POSITION_SUCCESS: {
        return {
            ...state,
            coords: action.coords,
            error: false
        };
    }
    case GET_POSITION_ERROR: {
        return {
            ...state,
            coords: false,
            error: action.error
        };
    }
    case GET_CURRENT_CITY: {
        return {
            ...state,
            city: action.city
        };
    }
    default: return state;
    }
}

