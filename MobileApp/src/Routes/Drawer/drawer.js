import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

import { logoutUser } from '../../Actions/UserActions';

import MenuItem from './Components/MenuItem';

const { width } = Dimensions.get('window');
const loginIcon = require('../../Items/login.png');
const registerIcon = require('../../Items/register.png');
const locationIcon = require('../../Items/add-location.png');
const aboutIcon = require('../../Items/about.png');
const feedbackIcon = require('../../Items/feedback.png');
const logoutIcon = require('../../Items/logout.png');

const screenWidth = width;

class Drawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false,
            userText: 'Нерегистриран потребител'
        };
        this.onLogoutPress = this.onLogoutPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && !firebase.auth().currentUser.isAnonymous) {
            this.setState({ logged: true, userText: firebase.auth().currentUser.email });
        }
        else this.setState({ logged: false, userText: 'Нерегистриран потребител' });
    }

    onLogoutPress() {
        this.props.logout();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 0.35,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    backgroundColor: 'rgb(43,62,81)',
                    position: 'relative'
                }}
                >
                    <Text style={{ color: 'rgb(246,247,248)', fontSize: 17, marginBottom: 10, marginLeft: 10 }}>
                        {this.state.userText}
                    </Text>
                </View>
                <View style={{ flex: 0.7, marginTop: 5 }}>
                {/* User Login Menu */}
                    {!this.state.logged ?
                        <MenuItem icon={loginIcon} onPress={Actions.Login} text="Влез" />
                        : null
                    }
                {/* User Register Menu */}
                    {!this.state.logged ?
                        <MenuItem icon={registerIcon} onPress={Actions.Register} text="Регистрирай се" />
                        : null
                    }

                    {!this.state.logged ?
                        <MenuItem icon={locationIcon} onPress={() => Actions.WarningPopup({ error: 'Нужна е регистрация за тази страница' })} text="Добавете маршрут" />
                        :
                        <MenuItem icon={locationIcon} onPress={Actions.RequestLine} text="Добавете маршрут" />
                    }
                    
                    <MenuItem icon={aboutIcon} onPress={Actions.Info} text="Полезна информация" />
                    <MenuItem icon={feedbackIcon} onPress={Actions.AboutUs} text="Отзиви" />

                    {this.state.logged ?
                        <MenuItem icon={logoutIcon} onPress={this.onLogoutPress} text="Излез" />
                        :
                        null
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(245,245,245)',
        flex: 1,
        flexDirection: 'column'
    },
    userIcon: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.4,
        marginLeft: 15
    }
});

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
