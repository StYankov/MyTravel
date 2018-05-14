import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0082;
const LONGITIDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

const userMarker = require('../../Items/userPosition.png');

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 42.020857,
            longitude: 23.094339
        };
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            () => undefined,
            {
                enableHighAccuracy: true,
                maximumAge: 2000,
                timeout: 7000
            }
        );


        this.watchId = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            () => undefined,
            {
                enableHighAccuracy: true,
                maximumAge: 2000,
                timeout: 7000
            }
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        const region = {
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITIDE_DELTA
        };

        region.latitude = this.state.latitude;
        region.longitude = this.state.longitude;

        return (
            <MapView
                style={styles.map}
                region={region}
                loadingEnabled
            >
                <MapView.Marker
                    title="Вашето местоположение"
                    image={userMarker}
                    coordinate={region}
                >
                    <MapView.Callout tooltip>
                        <View style={{ borderRadius: 4, backgroundColor: 'rgb(0,171,169)', margin: 2 }}>
                            <Text style={{ color: 'rgb(239,244,255)', margin: 2 }}>Вашето местоположение</Text>
                        </View>
                    </MapView.Callout>
                </MapView.Marker>
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: StyleSheet.absoluteFillObject
});

export default Map;
