import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';

const Row = props => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => Actions.push('singleDetails', { bus: props })}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <View style={styles.iconContainer}>
                        <EntypoIcon name="location-pin" size={35} />
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.textStyle}>{props.start.town} - {props.end.town}</Text>
                        <Text style={[styles.textStyle, { marginLeft: 30 }]}>
                            {props.departureTime}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => props.removeFav(props.id)}
            >
                <View style={styles.removeButtonContainer}>
                    <EntypoIcon name="cross" size={35} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#f5f5f5'
    },
    iconContainer: {
        flex: 0.2,
        alignItems: 'center'
    },
    contentContainer: {
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    removeButtonContainer: {
        flex: 0.2,
        alignItems: 'center',
        borderWidth: 0,
        borderColor: '#ccc',
        borderLeftWidth: StyleSheet.hairlineWidths
    },
    textStyle: {
        color: '#000',
        fontSize: 17,
        fontWeight: '500'
    }
});

export default Row;
