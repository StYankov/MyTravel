import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ConnectedList from './ConnectedList';

const BusWokrTime = {
    WEEKEND: 'weekend',
    WEEKDAY: 'workday',
    ALL: 'all'
};

function workTime(worktime) {
    if (worktime === BusWokrTime.WEEKDAY)
        return 'пн, вт, ср, чт, пт';
    if (worktime === BusWokrTime.WEEKEND)
        return 'сб, нд';

    return 'Всеки ден';
}

const details = props => {
    return (
        <View style={{ flex: 0.2 }}>
            <ConnectedList bus={props.bus} style={{ flex: 0.3 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <View style={styles.departureTimeContainer}>
                    <Text style={styles.textDefaultSize}>Час на тръгване:</Text>
                    <Text style={styles.fontStyles}>{props.bus.departureTime}</Text>
                </View>

                <View style={styles.workDaysContainer}>
                    <Text style={styles.textDefaultSize}>Работни дни:</Text>
                    <Text style={styles.fontStyles}>{workTime(props.bus.workTime)}</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    textDefaultSize: {
        fontSize: 16
    },
    departureTimeContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    fontStyles: {
        fontWeight: '800',
        fontSize: 18
    },
    workDaysContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default details;
