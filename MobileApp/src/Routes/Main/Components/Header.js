import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Icon
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import { HEADER_PURPLE, TEXT_COLOR } from '../../../Configuration/colors';

const Header = () => (
    <View style={styles.headerContainer}>
        <View style={styles.headerPositioning}>
            <TouchableOpacity onPress={Actions.drawerOpen}>
                <Icon
                    name="menu"
                    style={[styles.iconStyle, styles.leftIcon]}
                />
            </TouchableOpacity>
            <Text style={{ color: TEXT_COLOR, fontSize: 18, fontFamily: 'Roboto' }}>
                MyTravel
            </Text>

            <View style={{ flex: 0.1 }} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0.26,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: HEADER_PURPLE,
        borderBottomWidth: 2,
        borderBottomColor: '#392945'
    },
    headerPositioning: {
        flex: 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconStyle: {
        color: TEXT_COLOR,
        fontSize: 32
    },
    leftIcon: {
        marginLeft: 20
    }
});

export default Header;
