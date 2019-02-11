import GoogleMapsLoader from 'google-maps';

/**
 * @description Setting google map
 */
GoogleMapsLoader.KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];

let google;
const loadMap = () =>
    new Promise((resolve) => {
        if (google) {
            resolve(google);
        } else {
            GoogleMapsLoader.load(api => {
                google = api;
                resolve(api);
            });
        }
    });

const maps = async () => {
    const google = await loadMap();
    return google.maps;
};

export default maps ;
