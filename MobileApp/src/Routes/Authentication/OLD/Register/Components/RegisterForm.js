import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    Animated,
    Keyboard
} from 'react-native';

import UserInput from '../../Common/UserInput';

import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import eyeImg from '../../images/eye_black.png';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
            user: {
                email: '',
                password: '',
                passwordRepeat: ''
            }
        };
        this.showPass = this.showPass.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.marginValue = new Animated.Value(35);
    }

    componentWillMount(){
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    onTextChange(text, field) {
        const { user } = this.state;
        user[field] = text;
        this.setState({ user });
        this.props.onUserChange(this.state.user);
    }

    keyboardDidShow(){
        Animated.timing(this.marginValue, {
            duration: 300,
            toValue: this.props.bottomMarginWhenShrink || 10
        }).start();
    }

    keyboardDidHide(){
        Animated.timing(this.marginValue, {
            duration: 300,
            toValue: 35
        }).start();
    }

    showPass() {
        if (this.state.press)
            this.setState({ showPass: true, press: false });
        else
            this.setState({ showPass: false, press: true });
    }

    render() {
        return (
            <Animated.View style={{ flex: 0.28, marginBottom: this.marginValue }}>
                <KeyboardAvoidingView
                    behavior="position"
                    style={styles.container}
                >
                    <UserInput
                        source={usernameImg}
                        placeholder="Имейл адрес"
                        autoCapitalize="none"
                        returnKeyType="done"
                        autoCorrect={false}
                        field="email"
                        value={this.state.user.email}
                        onChange={this.onTextChange}
                    />
                    <UserInput
                        source={passwordImg}
                        secureTextEntry={this.state.showPass}
                        placeholder="Парола"
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.user.password}
                        field="password"
                        onChange={this.onTextChange}
                    />
                    <UserInput
                        source={passwordImg}
                        secureTextEntry={this.state.showPass}
                        placeholder="Потвърди парола"
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.user.passwordRepeat}
                        field="passwordRepeat"
                        onChange={this.onTextChange}
                    />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}
                    >
                        <Image source={eyeImg} style={styles.iconEye} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEye: {
        position: 'absolute',
        top: 152,
        right: 28
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)'
    }
});
