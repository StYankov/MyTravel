import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';
// temporary
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';
import { getPositionSuccess, getPositionError } from '../../../Actions/LocationActions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0082;
const LONGITIDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

const userMarker = require('../../../Items/userPosition.png');

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                latitude: 41.089673,
                longitude: 23.106020,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITIDE_DELTA
            },
            stops: []
        };
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.props.getCoordsSuccess(position.coords);
            },
            error => {
                if (this.props.coords === false)
                    this.props.getCoordsError(error.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 2000,
                timeout: 10000
            }
        );


        this.watchId = navigator.geolocation.watchPosition(
            location => {
                this.props.getCoordsSuccess(location.coords);
            },
            error => {
                this.props.getCoordsError(error.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 1500,
                timeout: 7000
            }
        );
    }


    componentDidMount(){
        firebase.database().ref('coordinates').child('Благоевград')
            .once('value')
            .then(snapShot => this.setState({ stops: snapShot.val() }));
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        let region = {
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITIDE_DELTA
        };
        let marker = null;
        if (this.props.coords !== undefined && this.props.coords !== false) {
            const { latitude, longitude } = this.props.coords;
            region.latitude = latitude;
            region.longitude = longitude;

            marker = {
                latitude,
                longitude
            };
        } else
            region = this.state.position;


        return (
            <MapView
                style={styles.map}
                region={region}
                loadingEnabled
            >
                {
                    this.state.stops.map(stop =>
                        <MapView.Marker key={stop.place} title={stop.place} coordinate={stop} />)
                }

                {
                    marker !== null ?
                        <MapView.Marker
                            title="Вашето местоположение"
                            image={userMarker}
                            coordinate={marker}
                        >
                            <MapView.Callout tooltip>
                                <View style={{ borderRadius: 4, backgroundColor: 'rgb(0,171,169)', margin: 2 }}>
                                    <Text style={{ color: 'rgb(239,244,255)', margin: 2 }}>Вашето местоположение</Text>
                                </View>
                            </MapView.Callout>
                        </MapView.Marker> : null}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});


const mapStateToProps = state => (
    {
        status: state.location.status,
        error: state.location.error,
        coords: state.location.coords
    }
);

const mapDispatchToProps = dispatch => (
    {
        getCoordsSuccess: coords => dispatch(getPositionSuccess(coords)),
        getCoordsError: error => dispatch(getPositionError(error))
    }
);

Map = connect(mapStateToProps, mapDispatchToProps)(Map);

export default Map;
