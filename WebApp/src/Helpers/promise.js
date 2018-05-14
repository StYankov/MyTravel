import { Promise } from "es6-promise";

export function promiseAll(args){
    const promises = [];

    for(const request of args) {
        promises.push(
            new Promise((resolve, reject) => {
                request.then(x => resolve(x))
                        .catch(err => reject(err));
            })
        );
    }

    return Promise.all(promises);
}