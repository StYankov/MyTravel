import React from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    StatusBar,
    Text
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { registerUser } from '../../../Actions/UserActions';
import RegisterForm from './RegisterForm';
import BackButton from '../BackButton';

const IMG_HEIGHT = 140;
const IMG_HEIGHT_SMALL = 120;
const IMG_WIDTH = 280;
const Logo = require('../images/logo.png');

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.LogoMargin = new Animated.Value(30);
        this.ImageSize = new Animated.Value(IMG_HEIGHT);

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
        if (nextProps.user.user === null)
            this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        this.keyboardOnEvent.remove();
        this.keyboardOffEvent.remove();
    }

    keyboardOn() {
        Animated.parallel([
            Animated.timing(this.LogoMargin, {
                toValue: 5,
                duration: 300
            }),
            Animated.timing(this.ImageSize, {
                toValue: IMG_HEIGHT_SMALL,
                duration: 400
            })
        ]).start();
    }

    keyboardOff() {
        Animated.parallel([
            Animated.timing(this.LogoMargin, {
                toValue: 30,
                duration: 300
            }),
            Animated.timing(this.ImageSize, {
                toValue: IMG_HEIGHT,
                duration: 400
            })
        ]).start();
    }

    formSubmit(user) {
        Keyboard.dismiss();

        const { password, email, passwordRepeat } = user;
        if (!Register.validateEmail(email)) {
            Actions.WarningPopup({ error: 'Невалиден имейл' });
            return;
        }
        if (password.length < 6) {
            Actions.WarningPopup({ error: 'Паролата трябва да е минимум 6 символа' });
            return;
        }
        if (password !== passwordRepeat) {
            Actions.WarningPopup({ error: 'Паролите не съвпадат' });
            return;
        }
        this.setState({ isLoading: true });

        this.props.registerUser(email, password);
    }

    render() {
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                style={{ flex: 1, flexGrow: 2, backgroundColor: '#9b59b6' }}
            >
                <StatusBar backgroundColo="#9b59b6" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Animated.View
                            style={[styles.logoContainer, { marginVertical: this.LogoMargin }]}
                        >
                            <Animated.Image
                                style={{ height: this.ImageSize, width: IMG_WIDTH }}
                                source={Logo}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Регистрация</Text>
                        </Animated.View>
                        <View style={styles.formContainer}>
                            <RegisterForm
                                isLoading={this.state.isLoading}
                                onSubmit={this.formSubmit}
                            />
                        </View>
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
    registerUser: (email, password) => dispatch(registerUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9b59b6'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 22,
        marginTop: 3,
        width: 100,
        textAlign: 'center',
        opacity: 0.9
    },
    registerText: {
        color: '#fff',
        fontSize: 16
    }
});
