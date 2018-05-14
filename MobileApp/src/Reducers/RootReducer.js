import LocationReducers from './LocationReducers';
import UserReducers from './UserReducers';
import SearchReducers from './SearchReducers';
import RoutesReducers from './RoutesReducers';

export default {
    lines: SearchReducers,
    location: LocationReducers,
    user: UserReducers,
    route: RoutesReducers
};
