import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const IconTextInput = ({ icon, value, placeholder, name, onKeyPress, width = 145 }) => (
    <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name={icon} size={20} color="rgb(102,22,173)" />
        <TextInput
            style={[styles.input, { width }]}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
            value={value}
            onChangeText={text => onKeyPress(text, name)}
        />
    </View>
);

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(241,241,241)',
        borderWidth: 2,
        borderColor: '#ccc'
    },
    searchIcon: {
        padding: 10
    },
    input: {
        height: 55,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: 'rgb(241,241,241)',
        color: '#424242',
        fontSize: 18

    }
});

export default IconTextInput;
