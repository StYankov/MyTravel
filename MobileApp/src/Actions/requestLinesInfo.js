import firebase from 'react-native-firebase';

function cleanArray(actual) {
    const newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

export async function requestLinesInformation(busIdsArray) {
    if (!Array.isArray(busIdsArray)) return null;

    const busRef = firebase.database().ref('buses');
    const requestArr = [];

    for (const id of busIdsArray) {
        requestArr.push(new Promise((resolve, reject) => {
            busRef.child(id).once('value')
                .then(snapShot => {
                    const bus = snapShot.val();
                    bus.id = snapShot.key;
                    resolve(bus);
                })
                .catch(error => reject(error));
        }));
    }

    const data = await Promise.all(requestArr);
    return data;
}

export function filterResults(data, start, end) {
    const filtered = [];

    for (const bus of data){
        const transitTowns = [];
        transitTowns.push(bus.start.town);

        bus.middle.forEach(x => {
            if (x.town !== transitTowns[0])
                transitTowns.push(x.town);
        });

        if (bus.end.town !== transitTowns[transitTowns.length - 1])
            transitTowns.push(bus.end.town);
        
        const indexOfStart = transitTowns.indexOf(start);

        for (let i = indexOfStart + 1; i < transitTowns.length; i++){
            if (transitTowns[i] === end){
                filtered.push(bus);
                break;
            }
        }
    }

    return filtered;
}
