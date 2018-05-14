import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    StatusBar
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { loginUser } from '../../../Actions/UserActions';
import LoginForm from './LoginForm';
import BackButton from '../BackButton';

const IMG_HEIGHT = 140;
const IMG_HEIGHT_SMALL = 120;
const IMG_WIDTH = 280;
const Logo = require('../images/logo.png');

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.LogoMargin = new Animated.Value(40);
        this.ImageSize = new Animated.Value(IMG_HEIGHT);
        this.RegisterTextOpacity = new Animated.Value(1.0);

        this.keyboardOn = this.keyboardOn.bind(this);
        this.keyboardOff = this.keyboardOff.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    componentDidMount() {
        this.keyboardOnEvent = Keyboard.addListener('keyboardDidShow', this.keyboardOn.bind(this));
        this.keyboardOffEvent = Keyboard.addListener('keyboardDidHide', this.keyboardOff.bind(this));
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.user === null)
            this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        this.keyboardOnEvent.remove();
        this.keyboardOffEvent.remove();
    }

    keyboardOn() {
        Animated.parallel([
            Animated.timing(this.LogoMargin, {
                toValue: 10,
                duration: 300
            }),
            Animated.timing(this.ImageSize, {
                toValue: IMG_HEIGHT_SMALL,
                duration: 400
            }),
            Animated.timing(this.RegisterTextOpacity, {
                toValue: 0.0,
                duration: 300
            })]).start();
    }

    keyboardOff() {
        Animated.parallel([
            Animated.timing(this.LogoMargin, {
                toValue: 40,
                duration: 300
            }),
            Animated.timing(this.ImageSize, {
                toValue: IMG_HEIGHT,
                duration: 400
            }),
            Animated.timing(this.RegisterTextOpacity, {
                toValue: 1.0,
                duration: 300
            })]).start();
    }

    formSubmit(user) {
        Keyboard.dismiss();

        const { password, email } = user;
        if (!Login.validateEmail(email)) {
            Actions.WarningPopup({ error: 'Невалиден имейл' });
            return;
        }
        if (password.length < 6) {
            Actions.WarningPopup({ error: 'Паролата трябва да е минимум 6 символа' });
            return;
        }
        this.setState({ isLoading: true });

        this.props.loginUser(email, password);
    }

    render() {
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                style={styles.container}
            >
                <StatusBar backgroundColor="#9b59b6" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Animated.View
                            style={[styles.logoContainer, { marginVertical: this.LogoMargin }]}
                        >
                            <Animated.Image
                                style={{ height: this.ImageSize, width: IMG_WIDTH }}
                                source={Logo}
                            />
                        </Animated.View>
                        <View style={styles.formContainer}>
                            <LoginForm
                                isLoading={this.state.isLoading}
                                onSubmit={this.formSubmit}
                            />
                        </View>
                        <Animated.View style={{ opacity: this.RegisterTextOpacity, alignItems: 'center', marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Register()}>
                                <View>
                                    <Text style={styles.registerText}>
                                        Нямаш акаунт? Регистрирай се
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
                <BackButton />
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 2,
        backgroundColor: '#9b59b6'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 22,
        marginTop: 10,
        width: 100,
        textAlign: 'center',
        opacity: 0.9
    },
    registerText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '500'
    }
});
