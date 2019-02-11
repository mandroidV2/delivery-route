import React, { Component } from 'react';
import * as ApiManager from '../../api/ApiManager'
import Loader from '../loader/Loader.jsx'
import maps from '../map/mapConfig'

/** Component is used to create the direction input form
 *  @author Manish Agrawal */
class DirectionForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            source : '',
            destination: '',
            totalDistance : 0,
            totalTime : 0,
            reset: true,
            isLoading: false
        }
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.autoComplete = this.autoComplete.bind(this);
    }

    componentDidMount() {
        this.autoComplete();
    }

    /**
     * Method is used to implement autocomplete functionality
     */
    autoComplete = async () => {
        const maps = await this.props.maps();
        const _this = this;
        new maps.places.Autocomplete(this.refs.sourceInput).addListener('place_changed',
            function() {
                _this.setState({source:  this.getPlace().formatted_address})
            }
        );
        new maps.places.Autocomplete(this.refs.destinationInput).addListener('place_changed',
            function() {
                _this.setState({destination: this.getPlace().formatted_address})
            })
        ;
    };

    /**
     * Method is used to change the state of location inputs
     * @param {event on element} event 
     */
    handleLocationChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    /**
     * Method is used to handle the submit event
     * @param {submit event} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isLoading : true})
        // call the api to find the paths
        ApiManager.submitLocation({}, (status, response, error) => {
            if (error) {
                this.props.onApiErrorOccured();
                this.setState({ reset: false, isLoading: false });
            } else {
                ApiManager.getDrivingRoute(response.token, (status, response, error) => {
                    this.setState({ reset: false, isLoading: false });
                    if(error) {
                        this.props.onApiErrorOccured();
                    } else {
                        if (response) {
                            switch(response.status) {
                                case 'in progress':
                                    this.props.onProgressStateFound(response.status);
                                    break;
                                case 'failure':
                                    this.props.onRouteFailure(response.error);
                                    break;
                                case 'success':
                                    this.setState({
                                        totalDistance : response.total_distance,
                                        totalTime: response.total_time
                                    });
                                    this.props.onDrivingRouteFound(response);
                                    break;
                                default:
                                    break;
                            }
                          }
                    }
                })
            }
        });
    }

    /**
     * Method is used to handle reset button click
     */
    handleResetClick() {
        this.setState({
            source : '',
            destination: '',
            totalDistance: 0,
            totalTime: 0,
            reset: true,
            isLoading: false
        });
        this.props.onFormReset();
    }

    /**
     * Method is used to clear the location input
     * @param {input state name} name 
     */
    clearInput(name) {
        this.setState({
            [name]: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Starting Location</label>
                    <br />
                    <input type = "text" 
                        name = "source"
                        ref = "sourceInput"
                        value = {this.state.source}
                        onChange={this.handleLocationChange}  required />
                    
                    <img className="cross_source cross"
                        onClick={() => this.clearInput('source')}
                        alt="Clear starting location"
                        style={{display: this.state.source ? 'inline-block' : 'none'}}
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/Close%2C_Web_Fundamentals.svg" />
                    

                    <br />
                    <br />
                    
                    <label>Drop-off Location</label>
                    <br />
                    <input type = "text"
                        name = "destination"
                        ref = "destinationInput"
                        value = {this.state.destination}
                        onChange={this.handleLocationChange} required />
                   
                    <img className="cross_destination cross" 
                        onClick={() => this.clearInput('destination')}
                        alt="Clear drop-off location"
                        style={{display: this.state.destination ? 'inline-block' : 'none'}}
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/Close%2C_Web_Fundamentals.svg" />

                    <br />
                    <br />

                    <div style={{display: this.state.totalDistance !== 0 ? 'inline-block' : 'none'}} >
                        Total distance : <span>{this.state.totalDistance}</span>
                        <br/>
                        Total time : <span>{this.state.totalTime}</span>
                    </div>

                    <br />
                    <br />

                    {this.state.isLoading ?  <Loader />
                     :  <div>
                            <input type = "submit" value={this.state.reset ? 'Submit' : 'Re-Submit'} />
                            &nbsp;&nbsp;
                            <input type = "reset" onClick={this.handleResetClick} />
                        </div> }

                </form>
            </div>
        );
    }
}

DirectionForm.defaultProps = {
    maps
}

export default DirectionForm