import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const Menu = ({ icon, text, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ marginVertical: 8 }}>
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.iconContainer}>
                <Image source={icon} style={{ width: 35, height: 35 }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    iconContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textStyle: {
        fontFamily: 'Roboto',
        fontSize: 23,
        color: 'rgb(12,12,12)',
        marginLeft: 5
    }
});

export default Menu;
