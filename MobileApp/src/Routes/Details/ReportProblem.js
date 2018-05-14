import React from 'react';
import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

const { width } = Dimensions.get('window');

class ReportProblem extends React.Component {
    constructor() {
        super();

        this.state = {
            problem: ''
        };
    }

    onSubmit() {
        Keyboard.dismiss();
        const { problem } = this.state;
        if (this.state.problem === '')
            Actions.pop();

        const report = {
            message: problem,
            sent: Date.now(),
            userID: firebase.auth().currentUser.email
        };

        firebase.database().ref('reports').push(report)
            .then(() => {
                Actions.pop();
                Actions.MessageBox({ message: 'Съобщението ви беше изпратено успешно' });
            })
            .catch(() => Actions.pop());
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <View style={styles.container}>
                    <Text style={styles.headerStyle}>Линия: {this.props.bus.start.town} - {this.props.bus.end.town} {this.props.bus.departureTime}</Text>
                    <TextInput
                        underlineColorAndroid="rgba(0,0,0,0)"
                        autoFocus
                        multiline
                        numberOfLines={3}
                        style={styles.textInputStyle}
                        placeholder="Опишете проблема"
                        onChangeText={text => this.setState({ problem: text })}
                        onSubmitEditing={() => this.onSubmit()}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => this.onSubmit()}
                    >
                        <View style={styles.btnContainer}>
                            <Text style={styles.btnText}>Изпрати</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={[styles.btnText, { marginTop: 15 }]}>
                        * Сигнализирайки ни за неточности във информацията, помагате със подобряването на точността на приложението. Благодаря ви!
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(83,90,116)',
        flex: 1,
        paddingHorizontal: 5
    },
    headerStyle: {
        fontSize: 22,
        fontFamily: 'Roboto',
        textAlign: 'center',
        color: 'white',
        marginTop: 15
    },
    textInputStyle: {
        width: width - 10,
        backgroundColor: '#ccc',
        textAlignVertical: 'top',
        borderRadius: 2,
        marginTop: 20,
        fontSize: 18
    },
    iconStyle: {
        alignSelf: 'flex-end'
    },
    btnContainer: {
        backgroundColor: 'rgb(126,192,238)',
        width,
        borderRadius: 2,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Roboto'
    }
});

export default ReportProblem;
