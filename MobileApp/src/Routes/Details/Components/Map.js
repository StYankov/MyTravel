import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const busStation = require('../../../Items/bus-station-icon.png');
const busStop = require('../../../Items/busStop.png');

class MapDirections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: {
                latitude: 42.020857,
                longitude: 23.094338,
                latitudeDelta: 0.0092,
                longitudeDelta: 0.0421
            },
            waypoints: []
        };

        this.GOOGLE_DIRECTIONS_KEY = 'AIzaSyCPeQW1KzdUhnPrQNYWOpmpdg10AHNom64';
    }

    componentWillMount() {
        const { bus } = this.props;
        this.getWayPoints(bus);
        this.setState(prevState => ({
            position: {
                ...prevState.position,
                latitude: bus.start.latLong.latitude,
                longitude: bus.start.latLong.longitude
            }
        }));
    }

    getWayPoints(nextProps) {
        const { middle } = nextProps;
        const arr = [];

        // push start bus station
        arr.push(nextProps.start.latLong);

        // push every middle town bus station
        for (const town of middle) {
            if (!town.latLong) continue;
            arr.push(town.latLong);
        }

        // push last bus station
        arr.push(nextProps.end.latLong);

        this.setState({
            waypoints: arr
        });
    }

    render() {
        const waypoints = this.state.waypoints.length > 0 ? this.state.waypoints.slice(1, -1) : [];

        return (
            <View style={{ flex: 1 }}>
                <View />
                <MapView
                    style={styles.map}
                    initialRegion={this.state.position}
                    region={this.state.position}
                    ref={c => { this.mapView = c; }}
                >

                    {this.state.waypoints.map((latLong, index) => (
                        <MapView.Marker
                            key={`coordinate_${latLong.place}${index}`}
                            coordinate={{
                                latitude: latLong.latitude,
                                longitude: latLong.longitude
                            }}
                            description={latLong.place}
                            title={latLong.place}
                            image={(index === 0) ? busStation : busStop}
                            style={{ width: 30, height: 30 }}
                        />))
                    }

                    {this.state.waypoints.length > 0 ?
                        <MapViewDirections
                            origin={this.state.waypoints[0]}
                            destination={this.state.waypoints[this.state.waypoints.length - 1]}
                            waypoints={waypoints}
                            apikey={this.GOOGLE_DIRECTIONS_KEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            onReady={result => {
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: parseInt(width / 20, 10),
                                        bottom: parseInt(height / 20, 10),
                                        left: parseInt(width / 20, 10),
                                        top: parseInt(height / 20, 10)
                                    }
                                });
                            }}
                        />
                        :
                        null
                    }
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    hr: {
        width,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc'
    }
});

export default MapDirections;
