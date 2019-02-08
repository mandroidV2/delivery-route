import * as ApiRequest from './ApiRequest'

const BaseURL = "http://localhost:8080"

/**
 * Method to submit the source and destination location to the api
 * @param {api params} params 
 * @param {result} result 
 */
export function submitLocation(params, result) {
    ApiRequest.makeApiRequest(BaseURL + "/route",
        "post", params,
        function (sucess, response, error) {
            // place to do some function dependent work

            // returning result
            result(sucess, response, error);
        }
      );
}

/**
 * Method to get the driving route from token
 * @param {token to get route} token 
 * @param {result callback} result 
 */
export function getDrivingRoute(token, result) {
    if (token != null) {
        ApiRequest.makeApiRequest(BaseURL + "/route/" + token,
            "get", {},
            function (sucess, response, error) {
                // place to do some function dependent work

                // returning result
                result(sucess, response, error);
            }
        );
    }
}