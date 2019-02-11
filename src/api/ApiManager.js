import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ROUTE_PATH = '/route';

/**
 * @description Wrapper over axios
 */
const client = axios.create({
    baseURL: BASE_URL
});

/**
 * @description Submit location
 * @param data : post data 
 */
export const submitLocation = data => {
    return client.post(ROUTE_PATH, data);
}

/**
 * Get driving route
 * @param token : send token in url to fetch the route detail
 */
export const getDrivingRoute = (token) => {
    return  client.get(ROUTE_PATH + '/'+token);
}


