import React from 'react';
import { Animated, StyleSheet, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('screen');
const screenWidth = parseInt(width, 10);

class MsgBox extends React.Component {
    constructor(props) {
        super(props);

        this.displayOpacity = new Animated.Value(1);
        this.hide = this.hide.bind(this);
    }
    hide() {
        Animated.timing(this.displayOpacity, {
            duration: 500,
            toValue: 0.0
        }).start(() => {
            Actions.pop();
        });
    }

    componentDidMount(){
        setTimeout(this.hide, 2000);
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, { opacity: this.displayOpacity }]}
            >
                <Text>{this.props.message}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: screenWidth - 100,
        left: (screenWidth - (screenWidth - 100)) / 2,
        height: 30,
        bottom: 50,
        zIndex: 2,
        backgroundColor: '#ccc',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        textAlign: 'center',
        color: '#f5f5f5',
        zIndex: 10001,
        fontSize: 18,
        lineHeight: 18,
        paddingVertical: 4
    }
});

export default MsgBox;
