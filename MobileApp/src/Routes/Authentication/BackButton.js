import React from 'react';
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
const BackButton = () => (
    <TouchableOpacity activeOpacity={0.9} onPress={Actions.pop} style={styles.container}>
        <View>
            <Ionicons name="ios-arrow-back" size={40} color='rgba(240,240,240,0.8)' />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        paddingLeft: 10,
        zIndex: 1000,
        width: 40
    }
});

export default BackButton;
