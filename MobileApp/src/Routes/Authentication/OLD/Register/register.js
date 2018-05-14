import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Popup from 'react-native-popup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';
import Logo from '../Common/Logo';
import Form from './Components/RegisterForm';
import Wallpaper from '../Common/Wallpaper';
import ButtonSubmit from '../Common/ButtonSubmit';
import { registerUser, userAuthError } from '../../../Actions/UserActions';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
                passwordRepeat: ''
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
            if (user && !user._user.isAnonymous)
                Actions.reset('root');
        });
    }

    componentWillReceiveProps(props) {
        if (props.user.error)
            this.decodeErrorMessage(props.user.error.code);
    }

    componentWillUnmount() {
        if (this.subscriber)
            this.subscriber();
    }

    onUserChange(user) {
        this.setState({ user });
    }

    onSubmit() {
        const { user } = this.state;
        if (user.password !== user.passwordRepeat) {
            this.popup.alert('Паролите не съвпадат');
            this.setState({ hasError: true });
            return;
        }

        if (user.password < 6) {
            this.popup.alert('Паролата е твърде кратка. Минимум 6 символа');
            this.setState({ hasError: true });
            return;
        }

        if (!this.validateEmail(user.email)) {
            this.popup.alert('Невалиден имейл адрес');
            this.setState({ hasError: true });
            return;
        }

        this.props.register(user.email, user.password);
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
                <KeyboardAwareScrollView scrollEnabled scrollsToTop extraHeight={20} >
                    <Logo />
                    <Form onUserChange={this.onUserChange} />
                    <ButtonSubmit
                        text="Регистрирай ме"
                        bottoMarginWhenShrink={0}
                        hasError={this.state.hasError}
                        onSubmit={this.onSubmit}
                    />
                </KeyboardAwareScrollView>
                <Popup ref={popup => { this.popup = popup; }} />
            </Wallpaper>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    register: (email, password) => dispatch(registerUser(email, password)),
    registerError: error => dispatch(userAuthError(error))
});

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
