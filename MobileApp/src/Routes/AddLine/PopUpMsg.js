import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

const PopUpMsg = () => (
    <TouchableWithoutFeedback onPress={Actions.pop}>
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.top}>
                    <Icon name="info" size={40} color="#2ecc71" />
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.textStyle}>От тук може да предложите на администратора на приложението да добави съществуващи автобусни линии, които все още не присъстват в приложението</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableWithoutFeedback onPress={Actions.pop}>
                        <View style={styles.btnInnerContainer}>
                            <Text style={styles.btnText}>Добре</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(200,200,200, 0.5)'
    },
    innerContainer: {
        backgroundColor: '#95a5a6',
        width: width - 50,
        borderRadius: 4
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#c0392b'
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    textStyle: {
        color: '#2c3e50',
        fontSize: 17,
        fontFamily: 'Roboto',
        textAlign: 'center'
    },
    btnContainer: {
        width: width - 50,
        marginBottom: 8
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: 'white'
    },
    btnInnerContainer: {
        marginHorizontal: 10,
        backgroundColor: 'rgb(102,22,173)',
        paddingVertical: 10
    }

});

export default PopUpMsg;
