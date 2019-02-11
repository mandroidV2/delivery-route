import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import DirectionForm from './components/directionform/DirectionForm.jsx';
import AlertBox from './components/alertbox/AlertBox.jsx';
import MapContainer from './components/map/MapContainer.jsx';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        driverRoute : [],
        alert: '',
        showAlert: false
    }
    this.handleApiError = this.handleApiError.bind(this);
    this.handleInProgressState = this.handleInProgressState.bind(this);
    this.handleRouteFaliure = this.handleRouteFaliure.bind(this);
    this.handleDrivingRoute = this.handleDrivingRoute.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
  }

  /**
   * Method is used to handle the api error
   */
  handleApiError() {
    this.setState({
      alert : 'Unable to submit location, Server error occured!!',
      showAlert: true
    })
  }

  /**
   * Method is used to handle the progress state
   */
  handleInProgressState(state) {
    this.setState({
      alert : state,
      showAlert: true
    })
  }

  /**
   * Method is used to handle route failure
   * @param {error msg} route 
   */
  handleRouteFaliure(error) {
    this.setState({
      alert : error,
      showAlert: true
    })
  }

  /**
   * Method is used to handle the driving route of the delivery
   * @param {driving route} route 
   */
  handleDrivingRoute(route) {
    const directionPath = [];
    if (route && route.path) {
      for (const point of route.path) {
          const pointLatLng = {};
          pointLatLng.lat = parseFloat(point[0]);
          pointLatLng.lng = parseFloat(point[1]);
          directionPath.push(pointLatLng);
      }
    }
    this.setState({ driverRoute : directionPath });
  }

  /**
   * Method is used to handle the form reset callback
   */
  handleFormReset() {
    this.setState({ driverRoute : [] });
  }
 
  hideAlert() {
    this.setState({
      alert : '',
      showAlert: false
    })
  }
  render() {
    return  (
      <div className="App">
        <Container>
          <Row>
              <Col xs={12} sm={4} md={4} lg={4} className="full-height">
                <DirectionForm 
                  onProgressStateFound={this.handleInProgressState}
                  onRouteFailure={this.handleRouteFaliure}
                  onDrivingRouteFound={this.handleDrivingRoute}
                  onApiErrorOccured={this.handleApiError}
                  onFormReset={this.handleFormReset} />
              </Col>
              <Col xs={12} sm={8} md={8} lg={8} className="full-height">
                <MapContainer path={this.state.driverRoute} />
              </Col>
            </Row>
        </Container>
        <AlertBox alert={this.state.alert} show={this.state.showAlert} onHideAlert={this.hideAlert.bind(this)} />
       </div>
      );
  }
}

export default App;
