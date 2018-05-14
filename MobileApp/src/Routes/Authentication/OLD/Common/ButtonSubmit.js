import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    View,
    Dimensions
} from 'react-native';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    componentWillReceiveProps(props){
        if (props.hasError !== null && this.state.isLoading)
            this.pressReverse();
    }

    _onPress() {
        if (this.state.isLoading) return;

        setTimeout(() => this.props.onSubmit(), 100);

        this.setState({ isLoading: true });
        Animated.timing(
            this.buttonAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

    pressReverse(){
        this.setState({ isLoading: false });
        Animated.timing(this.buttonAnimated, {
            toValue: 0,
            duration: 100,
            easing: Easing.exp
        }).start();
    }

    _onGrow() {
        Animated.timing(
            this.growAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN]
        });

        return (
            <View style={[styles.container]}>
                <Animated.View style={{ width: changeWidth }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1}
                    >
                        {this.state.isLoading ?
                            <Image source={spinner} style={styles.image} />
                            :
                            <Text style={styles.text}>{this.props.text}</Text>
                        }
                    </TouchableOpacity>
                    <Animated.View style={[styles.circle, {
                        transform: [{ scale: changeScale }]
                    }]}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: MARGIN + 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AE44C8',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0'
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 18
    },
    image: {
        width: 24,
        height: 24
    }
});
