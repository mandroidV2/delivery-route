import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import { Container, Row, Col } from 'react-bootstrap';
import DirectionForm from './components/DirectionFormContainer';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        driverRoute : []
    }
    this.handleDrivingRoute = this.handleDrivingRoute.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
  }

  handleApiError() {
    alert('Unable to submit location, Server error occured!!');
  }

  handleInProgressState(state) {
    alert(state);
  }

  handleRouteFaliure(route) {
    alert(route.error);
  }

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
    console.log('directionPath ', directionPath);
    this.setState({ driverRoute : directionPath });
  }

  handleFormReset() {
    console.log('form reset');
    this.setState({ driverRoute : [] });
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
       </div>
      );  
  }
}

export default App;
