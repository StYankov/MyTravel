export const SET_ROUTE_STATE = 'SET_ROUTE_STATE';

export function setRouteState(route, state){
    return {
        type: SET_ROUTE_STATE,
        state,
        route
    };
}
