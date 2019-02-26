import React from "react";
import maps from "./mapConfig"

/**
 *  Component is used to create the google map
 *  @author Manish Agrawal
 */
class MapContainer extends React.Component { 

    map; maps;

    componentDidMount() {
        this.initMap();
    }

    /**
     * intial value of google map
     */
    initMap = async () => {
        this.maps = await this.props.maps();
        this.map = new this.maps.Map(this.refs.mapContainer, {
            zoom: 10,
            center: { lat: 22.372081, lng: 114.107877 }
        });
    };

    preparePositionsFromPath = path => {
        return path.map(([lat, lng]) => new this.maps.LatLng(lat, lng));
    };

    /**
     * showing direction on google map
     */
    showDirections = ({ path }) => {
        const directionsService = new this.maps.DirectionsService();
        const directionsRenderer = new this.maps.DirectionsRenderer();

        directionsRenderer.setMap(this.map);

        const positions = this.preparePositionsFromPath(path);
        const waypoints = positions
            .slice(1, positions.length - 1)
            .map(location => ({ location, stopover: false }));

        // request for the google map directions api
        const request = {
            origin: positions[0],
            destination: positions[positions.length - 1],
            waypoints,
            optimizeWaypoints: true,
            travelMode: this.maps.TravelMode.DRIVING
        };

        // get the route from directionService and then plot with the help of directionsRenderer
        directionsService.route(request, (response, status) => {
            if (status === this.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error in direction service response');
            }
        });
    };

  

    /**
     * @description checking the prev props and the new props are same or not.
     */
    shouldComponentUpdate(nextProps){
        const {directions} = this.props;
        if(nextProps.directions && nextProps.directions.path && directions && directions.path){
            if(directions.path.length === nextProps.directions.path.length){
                for(let index = 0; index < directions.path.length ; index++){
                    if(directions.path[index][0] !== nextProps.directions.path[index][0] || directions.path[index][1] !== nextProps.directions.path[index][1]){
                        return true;
                    }
                    return false;
                }
            }
        }
        return true;
    }

    componentDidUpdate(prevProps) {
        const {directions} = this.props;
        if(prevProps.directions !== directions){
            if(directions === null){
                this.initMap();
            } else {
                this.showDirections(directions);
            }
        }
    }

    render() {
        return ( 
            <div ref="mapContainer" style={{width: '100%', height: '500px'}} /> 
        )
    }
}

MapContainer.defaultProps = { maps }

export default MapContainer;