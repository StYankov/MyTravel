import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard
} from 'react-native';
import { Form, Button } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { fetchData } from '../../../Actions/SearchActions';
import { INPUT_DARK_PURPLE, COLOR_SILVER } from '../../../Configuration/colors';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: '',
            end: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.state.end !== '' && this.state.start !== '') {
            Keyboard.dismiss();
            this.props.onSearch(this.state.start, this.state.end);
            Actions.search();
        }
    }


    render() {
        return (
            <View style={styles.formContainer}>
                <Form style={styles.formStyles}>
                    <View style={styles.inputContainer}>
                        <EntypoIcon name="location" size={20} style={styles.iconStyle} />
                        <TextInput
                            multiline={false}
                            placeholderTextColor={COLOR_SILVER}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={styles.input}
                            placeholder="Начало"
                            name="start"
                            value={this.state.start}
                            onChangeText={text => this.setState({ start: text })}
                            autoCorrect
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <EvilIcons name="location" size={25} style={styles.iconStyle} />
                        <TextInput
                            multiline={false}
                            placeholderTextColor={COLOR_SILVER}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={styles.input}
                            placeholder="Крайна спирка"
                            name="end"
                            value={this.state.end}
                            onChangeText={text => this.setState({ end: text })}
                        />
                    </View>

                    <Button
                        block
                        activeOpacity={0.7}
                        transparent
                        style={styles.buttonStyle}
                        onPress={this.handleSubmit}
                    >
                        <Text style={[styles.input, { textAlign: 'center' }]}>
                            Търси!
                        </Text>
                    </Button>

                </Form>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    input: {
        flex: 0.9,
        color: COLOR_SILVER,
        fontSize: 17,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: INPUT_DARK_PURPLE,
        borderRadius: 10,
        borderWidth: 0,
        paddingHorizontal: 7
    },
    inputIcon: {
        flex: 0.1,
        paddingLeft: 10
    },
    iconStyle: {
        color: '#FF4500',
        fontWeight: 'bold'
    },
    formContainer: {
        flex: 1.1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    formStyles: {
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: 13
    },
    buttonStyle: {
        borderWidth: 2,
        borderColor: '#634c75',
        borderRadius: 2,
        marginBottom: 15
    }
});

const mapDispatchToProps = dispatch => (
    {
        onSearch: (start, end) => {
            dispatch(fetchData(start, end));
        }
    }
);

SearchForm = connect(null, mapDispatchToProps)(SearchForm);

export default SearchForm;
