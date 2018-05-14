import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

const WarningPopUp = ({ error }) => {
    const ComponentOpacity = new Animated.Value(1);
    
    function decodeError(err){
        if (err.code)
            switch (err.code) {
            case 'auth/network-request-failed': {
                return 'Времето за заявката изтече';
            }
            case 'auth/email-already-in-use': {
                return 'Имейл адресът е зает';
            }
            case 'auth/wrong-password': {
                return 'Грешна парола';
            }
            case 'auth/user-not-found': {
                return 'Потребителят не съществува';
            }
            default: return 'Грешка';
            }
        
        return err;
    }

    function close(){
        Animated.timing(ComponentOpacity, {
            duration: 200,
            toValue: 0.01
        }).start(() => {
            Actions.pop();
        });
    }
    return (
        <TouchableWithoutFeedback onPress={() => close()}>
            <Animated.View style={[styles.container, { opacity: ComponentOpacity }]}>
                <View style={styles.popupContainer}>
                    <View style={styles.topContainer}>
                        <EntypoIcon name="warning" size={50} />
                    </View>
                    <View style={styles.errorContainer}>
                        <Text style={styles.textStyle}>{decodeError(error)}</Text>
                        <TouchableWithoutFeedback onPress={() => close()}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Добре</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(200, 214, 229, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupContainer: {
        width: width - 50,
        padding: 10
    },
    topContainer: {
        backgroundColor: 'rgb(234, 32, 39)',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        backgroundColor: 'rgb(245, 246, 250)',
        padding: 15,
        flexDirection: 'column',
        alignItems: 'center'
    },
    textStyle: {
        color: '#000',
        fontFamily: 'Roboto',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10
    },
    buttonContainer: {
        backgroundColor: 'rgb(235, 47, 6)',
        height: 45,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 18
    }
});

export default WarningPopUp;
