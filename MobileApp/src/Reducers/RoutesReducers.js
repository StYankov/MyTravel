import {
    SET_ROUTE_STATE
} from '../Actions/RouteActions';

export default function routesReducer(state = { reviewButton: false }, action){
    switch (action.type){
    case SET_ROUTE_STATE: {
        return {
            ...state,
            currentRoute: action.route,
            bus: action.state
        };
    }
    default: return state;
    }
}
