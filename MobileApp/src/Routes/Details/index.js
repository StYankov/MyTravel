import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Details from './Components/Details';
import MapDirections from './Components/Map'

import { setRouteState } from '../../Actions/RouteActions';


class DetailsPage extends Component {

    componentDidMount(){
        this.props.setRouteState('details', this.props.bus);
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <Details bus={this.props.bus} />
                <MapDirections bus={this.props.bus} />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setRouteState: (route, state) => dispatch(setRouteState(route, state))
});

export default connect(null, mapDispatchToProps)(DetailsPage);
