import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const SignUpSection = () => (
    <View style={styles.container}>
        <Text onPress={Actions.registerScreen} style={styles.text}>Регистрирай се</Text>
        <Text style={styles.text}>Забравена парола?</Text>
    </View>
);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Roboto',
        zIndex: 101
    }
});

export default SignUpSection;
