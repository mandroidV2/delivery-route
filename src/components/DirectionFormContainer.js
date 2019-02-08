import React, { Component } from 'react';
import * as ApiManager from '../api/ApiManager'

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
            reset: true
        }
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleLocationChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // call the api to find the paths
        ApiManager.submitLocation({}, (status, response, error) => {
            console.log('result : ' , status);console.log('response : ' , response);console.log('error : ' , error);
            if (error) {
                this.props.onApiErrorOccured();
                this.setState({ reset: false });
            } else {
                ApiManager.getDrivingRoute(response.token, (status, response, error) => {
                    this.setState({ reset: false });
                    console.log('result : ' , status);console.log('response : ' , response);console.log('error : ' , error);
                    if(error) {
                        this.props.onApiErrorOccured();
                    } else {
                        if (response) {
                            switch(response.status) {
                                case 'in progress':
                                    this.props.onProgressStateFound(response.status);
                                    break;
                                case 'failure':
                                    this.props.onRouteFailure(response);
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

    handleResetClick() {
        this.setState({
            source : '',
            destination: '',
            totalDistance: 0,
            totalTime: 0,
            reset: true
        });
        this.props.onFormReset();
    }

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
                    &nbsp;&nbsp;
                    <input type = "text" 
                        name = "source"
                        value = {this.state.source} 
                        onChange={this.handleLocationChange}  required />
                    
                    {this.state.source ? 
                        <img className="cross-img"
                            onClick={() => this.clearInput('source')}
                            src="https://upload.wikimedia.org/wikipedia/commons/3/36/Close%2C_Web_Fundamentals.svg" />
                    :  ''}

                    <br />
                    <br />
                    
                    <label>Drop-off Location</label>
                    &nbsp;&nbsp;
                    <input type = "text"
                        name = "destination"
                        value = {this.state.destination}
                        onChange={this.handleLocationChange} required />
                   
                    {this.state.destination ? 
                        <img className="cross-img" 
                            onClick={() => this.clearInput('destination')}
                            src="https://upload.wikimedia.org/wikipedia/commons/3/36/Close%2C_Web_Fundamentals.svg" />
                    :  ''}

                    <br />
                    <br />

                    {this.state.totalDistance !== 0 ?
                        <div>
                            Total distance : <span>{this.state.totalDistance}</span>
                            <br/>
                            Total time : <span>{this.state.totalTime}</span>
                        </div> : ''}


                    <br />

                    <input type = "submit" value={this.state.reset ? 'Submit' : 'Re-Submit'} />
                    &nbsp;&nbsp;
                    <input type = "reset" onClick={this.handleResetClick} />
                </form>
            </div>
        );
    }
}

export default DirectionForm