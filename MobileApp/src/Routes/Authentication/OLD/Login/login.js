import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Popup from 'react-native-popup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';

import Logo from '../Common/Logo';
import Form from './Components/Form';
import Wallpaper from '../Common/Wallpaper';
import ButtonSubmit from '../Common/ButtonSubmit';
import SignupSection from './Components/SignupSection';

import { loginUser } from '../../../Actions/UserActions';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: ''
            },
            hasError: false
        };

        this.onUserChange = this.onUserChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.decodeErrorMessage = this.decodeErrorMessage.bind(this);
    }

    componentDidMount() {
        this.subscriber = firebase.auth().onUserChanged(user => {
            // eslint-disable-next-line
            if (user && !user._user.isAnonymous) // if user is registered
                Actions.reset('root');
        });
    }

    componentWillReceiveProps(props) {
        if (props.user.error)
            this.decodeErrorMessage(props.user.error.code);
    }

    shouldComponentUpdate() {
        if (Actions.currentScene === 'loginScreen')
            return true;
        return false;
    }

    componentWillUnmount() {
        if (this.subscriber)
            this.subscriber();
    }

    onUserChange(user) {
        this.setState({ user });
    }

    onSubmit() {
        // get user
        const { user } = this.state;
        if (!this.validateEmail(user.email) || user.email < 2) {
            this.setState({ hasError: true });
            this.popup.alert('Невалиден имейл адрес');
            return;
        }
        if (user.password < 6) {
            this.setState({ hasError: true });
            this.popup.alert('Твърде кратка парола. Миниумум 6 символа');
            return;
        }
        this.props.login(user.email, user.password);
    }

    decodeErrorMessage(errorCode) {
        this.setState({ hasError: true });

        switch (errorCode) {
            case 'auth/network-request-failed': {
                this.popup.alert('Времето за заявката изтече');
                break;
            }
            case 'auth/email-already-in-use': {
                this.popup.alert('Имейл адресът е зает');
                break;
            }
            case 'auth/wrong-password': {
                this.popup.alert('Грешна парола');
                break;
            }
            case 'auth/user-not-found': {
                this.popup.alert('Потребителят не съществува');
                break;
            }
            default: break;
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        return (
            <Wallpaper>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                <Logo />
                <Form onUserChange={this.onUserChange} />
                <ButtonSubmit
                    onSubmit={this.onSubmit}
                    hasError={this.state.hasError}
                    text="Влез"
                />
                <SignupSection />
                <Popup ref={popup => { this.popup = popup; }} />
                </View>
                </TouchableWithoutFeedback>
            </Wallpaper>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(loginUser(email, password))
});

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
