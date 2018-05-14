import {
    DATA_LOAD,
    DATA_LOAD_ERROR,
    DATA_LOAD_SUCCESS,
    DATA_STATUS
} from '../Actions/SearchActions';

export default function searchReducers(state = {}, action) {
    switch (action.type) {
    case DATA_LOAD: {
        return {
            data: [],
            status: DATA_STATUS.LOADING
        };
    }
    case DATA_LOAD_ERROR: {
        return {
            data: [],
            status: DATA_STATUS.ERROR
        };
    }
    case DATA_LOAD_SUCCESS: {
        return {
            data: action.data,
            status: DATA_STATUS.RECEIVED
        };
    }
    default: return state;
    }
}
