import firebase from 'react-native-firebase';
import { requestLinesInformation, filterResults } from './requestLinesInfo';

export const DATA_LOAD = 'DATA_LOAD';
export const DATA_LOAD_ERROR = 'DATA_LOAD_ERROR';
export const DATA_LOAD_SUCCESS = 'DATA_LOAD_SUCCESS';

export const DATA_STATUS = {
    LOADING: 'LOADING',
    ERROR: 'ERROR',
    RECEIVED: 'RECEIVED'
};

function cleanArray(actual) {
    const newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

async function getVotesForLines(lines) {
    const PromiseArr = [];
    const dbVoteRef = firebase.database().ref('votes');
    for (const bus of lines) {
        const { id } = bus;
        PromiseArr.push(new Promise((resolve, reject) => {
            dbVoteRef.child(id).child('rate').once('value')
                .then(snapShot => {
                    resolve(Number(snapShot.val()));
                })
                .catch(error => reject(error));
        }));
    }

    const data = await Promise.all(PromiseArr);
    for (let i = 0; i < lines.length; i++)
        lines[i].rate = data[i];
    return lines;
}

export function fetchData(start, end) {
    return async dispatch => {
        dispatch(dataLoad());

        try {
            console.log('load');
            const busIds = await firebase.database().ref('towns').child(start).once('value');
            console.log(busIds);
            const data = await requestLinesInformation(cleanArray(busIds.val()));
            console.log(data);
            const filteredData = filterResults(data, start, end);
            console.log(filteredData);
            const linesWithVotes = await getVotesForLines(filteredData);
            dispatch(dataLoadSuccess(linesWithVotes));
        } catch (e) {
            dispatch(dataLoadError(e));
        }
    };
}

export function dataLoad() {
    return {
        type: DATA_LOAD
    };
}

export function dataLoadError() {
    return {
        type: DATA_LOAD_ERROR
    };
}

export function dataLoadSuccess(data) {
    return {
        type: DATA_LOAD_SUCCESS,
        data
    };
}
