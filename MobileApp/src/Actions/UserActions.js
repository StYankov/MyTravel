import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export const SET_USER_IN_STATE = 'SET_USER_IN_STATE';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';


// AUTHENTICATION
export function registerUser(email, password) {
    return (dispatch, getState) => {
        const cred = firebase.auth.EmailAuthProvider.credential(email, password);
        const userState = getState().user;
        firebase.auth().currentUser.linkAndRetrieveDataWithCredential(cred)
            .then(user => {
                const dbUserRef = firebase.database().ref('users').child(firebase.auth().currentUser.uid);
                const userInState = {
                    lastUpdate: Date.now(),
                    favourites: userState.favourites || []
                };

                dispatch(setUserInState(userInState));
                dbUserRef.set(userInState)
                    .then(() => Actions.popTo('landingPage'))
                    .catch(error => Actions.WarningPopup({ error }));
            })
            .catch(error => Actions.WarningPopup({ error }));
    };
}

export function loginUser(email, password) {
    return dispatch => {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(async user => {
                try {
                    const dbUserRef = firebase.database().ref('users').child(user.user.uid);
                    const value = await dbUserRef.once('value').then(x => x.val());
                    // Firebase doesn't support empty arrays so check if the user
                    // has any favourites or else assign empty array 
                    value.favourites = value.favourites || [];
                    dispatch(setUserInState(value));
                    Actions.popTo('landingPage');
                } catch (error) {
                    Actions.WarningPopup({ error });
                }
            })
            .catch(error => {
                Actions.WarningPopup({ error });
            });
    };
}

export function logoutUser() {
    return dispatch => {
        Actions.popTo('landingPage');
        firebase.auth().signOut()
            .then(() => {
                dispatch(userLogout());
            })
            .catch(() => undefined);
    };
}

export function signInAnonymously() {
    return dispatch => {
        firebase.auth().signInAnonymouslyAndRetrieveData()
            .then(() => {
                const userInState = {
                    favourites: []
                };
                dispatch(setUserInState(userInState));
            })
            .catch(error => undefined);
    };
}

export function setUserInState(user) {
    return {
        type: SET_USER_IN_STATE,
        user
    };
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    };
}

// END AUTHENTICATION


// BUS RELATED

export const ADD_FAVOURITES_TO_STATE = 'ADD_FAVOURITES_TO_STATE';
export const REMOVE_LINE_SUCCESS = 'REMOVE_LINE_SUCCESS';


export function addLineToFavourites(bus) {
    return async (dispatch, getState) => {
        const { user } = getState();

        const favArray = user.favourites || [];
        const busFromDB = await firebase.database().ref('buses').child(bus).once('value')
            .then(val => val.val());

        busFromDB.id = bus;

        favArray.push(busFromDB);
        user.favourites = favArray;
        user.lastUpdate = Date.now();

        if (!firebase.auth().currentUser.isAnonymous) {
            const userInDb = firebase.database().ref('users').child(firebase.auth().currentUser.uid);

            userInDb.child('favourites').set(favArray);
            userInDb.child('lastUpdate').set(user.lastUpdate);
        }

        dispatch(addFavouritesToState(user));
        Actions.MessageBox({ message: 'Линията беше добавена в любими!' });

    };
}

export function addFavouritesToState(user) {
    return {
        type: ADD_FAVOURITES_TO_STATE,
        user
    };
}

export function removeLineFromFavourites(bus) {
    return async (dispatch, getState) => {
        const { user } = getState();
        const dbUserRef = firebase.database().ref('users').child(firebase.auth().currentUser.uid);
        let favArray = user.favourites || [];
        
        if (favArray.some(busID => busID.id === bus)) {
            favArray = favArray.filter(busID => busID.id !== bus);
        }

        user.favourites = favArray;
        user.lastUpdate = Date.now();

        if( !firebase.auth().currentUser.isAnonymous ) {
            dbUserRef.child('favourites').set(favArray);
            dbUserRef.child('lastUpdate').set(user.lastUpdate);
        }

        dispatch(removeLineFromState(user));
        Actions.MessageBox({ message: 'Линията беше премахната от любими!' });
    };
}

export function removeLineFromState(user) {
    return {
        type: REMOVE_LINE_SUCCESS,
        user
    };
}

// LINE VOTE

export const VOTE_SUCCESS = 'VOTE_SUCCESS';
const defualtVoteDB = {
    totalVotes: 0,
    rate: 0,
    userIDs: []
};

export function voteLine(busId, rating, comment) {
    return async dispatch => {
        const dbVoteRef = firebase.database().ref('votes');
        let voteRef = await dbVoteRef.child(busId).once('value').then(x => x.val());

        if (voteRef === null) {
            voteRef = defualtVoteDB;
            voteRef.busId = busId;
        }

        if (voteRef.userIDs.some(x => x.userID === firebase.auth().currentUser.uid)) {
            Actions.MessageBox({ message: 'Вече сте оценили тази линия' });
            return;
        }
        // proccess the vote
        voteRef.totalVotes += 1;
        voteRef.rate = (voteRef.rate + rating) / voteRef.totalVotes;

        // create single vote unit
        const vote = {
            userID: firebase.auth().currentUser.uid,
            rate: rating,
            comment
        };
        // add updated vote
        voteRef.userIDs.push(vote);
        Actions.MessageBox({ message: 'Гласувахте успешно!' });
        Actions.pop();
        dbVoteRef.child(busId).set(voteRef)
            .catch(() => undefined);
        dispatch(voteSuccess());
    };
}

export function voteSuccess() {
    return {
        type: VOTE_SUCCESS
    };
}
