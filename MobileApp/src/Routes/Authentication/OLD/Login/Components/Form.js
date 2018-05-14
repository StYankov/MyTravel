import React, { Component } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    Keyboard,
    Animated
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
                password: ''
            }
        };
        this.showPass = this.showPass.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.containerMargin = new Animated.Value(30);
    }

    componentWillMount(){
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount(){
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    onTextChange(text, field){
        const { user } = this.state;
        user[field] = text;
        this.setState({ user });
        this.props.onUserChange(this.state.user);
    }

    keyboardDidShow(){
        Animated.timing(this.containerMargin, {
            duration: 300,
            toValue: 0
        }).start();
    }

    keyboardDidHide(){
        Animated.timing(this.containerMargin, {
            duration: 300,
            toValue: 30
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
            <Animated.View style={{ flex: 0.2, paddingBottom: this.containerMargin }}>
                <KeyboardAvoidingView
                    style={styles.container}
                >
                    <UserInput
                        source={usernameImg}
                        placeholder="Имейл"
                        autoCapitalize="none"
                        returnKeyType="done"
                        autoCorrect={false}
                        field="email"
                        onChange={this.onTextChange}
                        value={this.state.user.email}
                    />
                    <UserInput
                        source={passwordImg}
                        secureTextEntry={this.state.showPass}
                        placeholder="Парола"
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoCorrect={false}
                        field="password"
                        onChange={this.onTextChange}
                        value={this.state.user.password}
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
        height: 125,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEye: {
        position: 'absolute',
        top: 81,
        right: 28
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)'
    }
});
