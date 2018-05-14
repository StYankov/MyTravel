export const LOCATION_STATUS = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const LOCATION_STATE = 'LOCATION_STATE';
export const GET_POSITION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_POSITION_ERROR = 'GET_LOCATION_ERROR';
export const GET_CURRENT_CITY = 'GET_CURRENT_CITY';

export function locationSuccess(){
    return {
        type: LOCATION_STATE,
        status: LOCATION_STATUS.SUCCESS
    };
}

export function locationError(){
    return {
        type: LOCATION_STATE,
        status: LOCATION_STATUS.ERROR
    };
}

export function getPositionSuccess(coords){
    return {
        type: GET_POSITION_SUCCESS,
        coords
    };
}

export function getPositionError(error){
    return {
        type: GET_POSITION_ERROR,
        error
    };
}

export function currentCity(city){
    return {
        type: GET_CURRENT_CITY,
        city
    };
}
