import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const Logo = require('../Authentication/images/logo.png');

const AboutUs = () => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image
                source={Logo}
                style={styles.imgStyle}
            />
        </View>
        <View style={styles.description}>
            <Text style={styles.descrText}>
                MyTravel се разработва Стоил Янков, ученик в ПМГ Благоревград. Проектът е направен по повод Национална олимпиада по Информационни технологии.
                Главната цел е да се улесни пътуването със междуградските транспортни линии в България.
            </Text>
        </View>
        <View style={{ marginTop: 25, position: 'absolute', bottom: 0 }}>
            <View style={styles.info}>
                <View style={styles.list}>
                    <Text style={styles.listText}>Версия: 0.1</Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.listText}>Изисква Android: 6.0+</Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.listText}>Powred by: <Icon name="react" size={20} color="#2980b9" /> React Native</Text>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#e5e5e5',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logoContainer: {
        flex: 0.4,
        justifyContent: 'center',
        height: 200,
        marginTop: 10
    },
    imgStyle: {
        width: 300,
        height: 150
    },
    description: {
        paddingHorizontal: 15
    },
    descrText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'justify'
    },
    list: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        padding: 10,
        width
    },
    listText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        paddingLeft: 10,
        marginVertical: 5
    }
});

export default AboutUs;
