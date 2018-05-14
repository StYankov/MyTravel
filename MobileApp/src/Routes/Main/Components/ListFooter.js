import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

const mapIcon = require('../../../Items/map-icon.png');

const Footer = () => (
    <TouchableWithoutFeedback
        onPress={() => Actions.Map()}
    >
        <View style={styles.footerContainer}>
            <View style={styles.footerIcon}>
                <Image style={styles.iconStyle} key="map-icon" source={mapIcon} />
            </View>
            <View style={styles.footerContent}>
                <Text style={styles.footerText}>Покажи карта</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
        padding: 5,
        borderTopWidth: 1,
        borderColor: '#ccc'
    },
    footerIcon: {
        flex: 0.15,
        alignItems: 'center'
    },
    footerContent: {
        flex: 0.8
    },
    footerText: {
        paddingTop: 4,
        fontSize: 20,
        fontFamily: 'Roboto',
        color: 'rgb(40,40,40)'
    },
    iconStyle: {
        width: 35,
        height: 35
    }
});

export default Footer;
