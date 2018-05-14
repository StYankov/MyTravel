import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }
    render() {
        const loading = Boolean(this.props.isLoading);
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="rgba(0,0,0,0.0)"
                    placeholderTextStyle="rgba(255,255,255,0.7)"
                    placeholder="Имейл"
                    returnKeyType="next"
                    autoCorrect={false}
                    onSubmitEditing={() => {
                        this.refs.SecondInput.focus();
                    }}
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="rgba(0,0,0,0.0)"
                    placeholderTextStyle="rgba(255,255,255,0.7)"
                    secureTextEntry
                    placeholder="Парола"
                    autoCorrect={false}
                    ref="SecondInput"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}

                />
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => this.props.onSubmit(this.state)}
                >
                    <View style={{ flexDirection: 'row', marginLeft: -21 }}>
                        {loading && (
                            <ActivityIndicator
                                color="#fff"
                                size={16}
                            />
                        )}
                        {!loading && (
                            <View style={{ width: 16, height: 16 }} />
                        )}
                        <Text style={styles.buttonText}>Влез</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 45,
        backgroundColor: 'rgba(240,240,240,0.8)',
        marginBottom: 15,
        color: 'rgba(40,40,40,0.9)',
        paddingHorizontal: 10,
        fontFamily: 'Roboto',
        fontSize: 16
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
        paddingLeft: 5
    }
});
