import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Dimensions
} from 'react-native';

const UseInput = props => (
    <View style={styles.inputWrapper}>
        <Image
            source={props.source}
            style={styles.inlineImg}
        />
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            autoCorrect={props.autoCorrect}
            autoCapitalize={props.autoCapitalize}
            returnKeyType={props.returnKeyType}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            value={props.value}
            onChangeText={text => props.onChange(text, props.field)}
            blurOnSubmit={false}
        />
    </View>
);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(204, 204, 204, 0.8)',
        width: DEVICE_WIDTH - 40,
        height: 45,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700'
    },
    inputWrapper: {
        flex: 0.6,
        justifyContent: 'center'
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 20
    }
});

export default UseInput;
