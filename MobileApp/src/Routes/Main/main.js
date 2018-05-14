import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    Text,
    BackAndroid
} from 'react-native';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { signInAnonymously, removeLineFromFavourites } from '../../Actions/UserActions';

import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import FavouritesList from './Components/FavouritesList';

import { VIOLET_DARK, HEADER_PURPLE } from '../../Configuration/colors';


class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            fav: []
        };
    }
    async componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
            if (!user) this.props.signInAnonymously(); // if user is not registered nor anonymous
        });
    }

    componentWillReceiveProps(nextProps){
        // if redux persist get errror
        if(nextProps.user.favourites === undefined)
            BackAndroid.exitApp();

        if (nextProps.user)
            this.setState({ fav: nextProps.user.favourites });
    }

    componentWillUnmount() {
        if (this.unsubscriber)
            this.unsubscriber();
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <View style={styles.container}>

                    <StatusBar backgroundColor={HEADER_PURPLE} />

                    <View style={styles.searchFormContainer}>
                        <Header />
                        <SearchForm />
                    </View>

                    <View style={{ flex: 0.52 }}>

                        <FavouritesList
                            removeFav={this.props.removeLine}
                            favourites={this.state.fav}
                        />

                        <View style={styles.btnContainer}>
                            <TouchableWithoutFeedback onPress={Actions.Info}>
                                <View style={styles.button}>
                                    <Feather name="search" size={25} color='#ff4500' />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={Actions.allLines}>
                                <View style={styles.button}>
                                    <Feather name="list" size={25} color='#fff' />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>

                </View>

            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    searchFormContainer: {
        backgroundColor: VIOLET_DARK,
        flex: 0.48,
        flexDirection: 'column'
    },
    btnContainer: {
        backgroundColor: '#6a3281',
        height: 50,
        flexDirection: 'row'
    },
    button: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
// get user object from state with favourite lines included
const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    signInAnonymously: () => dispatch(signInAnonymously()),
    removeLine: busID => dispatch(removeLineFromFavourites(busID))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
