import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import IconTextBox from './IconTextInput';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

class AddLine extends React.Component {
    constructor() {
        super();
        this.state = {
            start: '',
            end: '',
            description: ''
        };

        this.onKeyPress = this.onKeyPress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        Actions.AddLinePopUp();
    }

    onKeyPress(text, name) {
        const state = this.state;
        state[name] = text;

        this.setState(state);
    }

    onSubmit() {
        if( this.state.start === "" || this.state.start === "" || this.state.description === "") return;

        const request = {
            start: this.state.start,
            end: this.state.end,
            message: this.state.description,
            userID: firebase.auth().currenUser.uid,
            sent: Date.now()
        };

        firebase.database().ref('reports').push(request)
            .then(() => {
                Actions.pop();
                Actions.MessageBox({ message: 'Предложението беше изпратен! Благодарим Ви!' });
            })
            .catch(() => Actions.pop());
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.topText}>Маршрут</Text>
                    <View style={styles.locationInpuContinr}>
                        <IconTextBox
                            icon="location"
                            value={this.state.start}
                            placeholder="Начало"
                            name="start"
                            onKeyPress={this.onKeyPress}
                        />
                        <IconTextBox
                            icon="location-pin"
                            value={this.state.end}
                            placeholder="Край"
                            name="end"
                            onKeyPess={this.onKeyPress}
                        />
                    </View>
                    <Text style={[styles.topText, { marginTop: 30 }]}>Описание</Text>
                    <View style={styles.descriptionContainer}>
                        <IconTextBox
                            icon="new-message"
                            value={this.state.description}
                            placeholder="Къде минава, Час на тръгване..."
                            name="description"
                            onKeyPress={this.onKeyPress}
                            width={width - 70}
                            multiline
                        />
                    </View>

                    <View style={styles.infoBoxContainer}>
                        <Text style={styles.infoText}>С действията си допринасяте за развитието на приложението и увеличаването на обема от автобусни линии.</Text>
                        <Text style={styles.infoText}>Благодаря ви!</Text>
                    </View>
                    <View style={styles.sendButtonContainer}>
                        <TouchableWithoutFeedback onPress={this.onSubmit}>
                            <View>
                                <Text style={styles.sendBtnText}>Изпрати</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    topText: {
        marginTop: 10,
        marginLeft: 30,
        color: 'rgb(102,22,173)',
        fontSize: 25
    },
    locationInpuContinr: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10
    },
    descriptionContainer: {
        paddingHorizontal: 10,
        marginTop: 10
    },
    infoBoxContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#c0392b',
        padding: 5
    },
    infoText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Roboto',
        textAlign: 'center'
    },
    sendButtonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        width,
        height: 50,
        backgroundColor: 'rgb(109,218,29)'
    },
    sendBtnText: {
        color: '#fff',
        fontFamily: 'Robotom',
        fontWeight: '800',
        fontSize: 20
    }
});

export default AddLine;
