import Axios from "axios";

/**
 * Function is used make the api request
 * @param {Api url} apiUrl 
 * @param {method type} apiMethod 
 * @param {api parameters} params 
 * @param {result callback} result 
 */
export function makeApiRequest(apiUrl, apiMethod, params, result) {
    if (window.navigator.onLine) {
        Axios({method: apiMethod, url: apiUrl, data: params, headers: {}})
            .then(response => { result(true, response.data, null);})
            .catch(error => { result(false, null, error);});

    } else {
        // /error.response
        let error = {response : {data : {title : null}}}
        result(false, null, error);
    }
}
