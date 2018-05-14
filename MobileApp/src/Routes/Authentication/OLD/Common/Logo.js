import React from 'react';
import {
    StyleSheet,
    Image,
    Animated,
    Keyboard
} from 'react-native';

import logoImg from '../images/logo.png';

const IMAGE_HEIGHT = 130;

class Logo extends React.Component {
    constructor(props) {
        super(props);

        this.topMargin = new Animated.Value(40);
        this.textMargin = new Animated.Value(15);
        this.textFont = new Animated.Value(23);
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    keyboardDidShow() {
        Animated.parallel([
            Animated.timing(this.topMargin, {
                duration: 300,
                toValue: 0
            }).start(),
            Animated.timing(this.textMargin, {
                duration: 300,
                toValue: 10
            }).start(),
            Animated.timing(this.textFont, {
                duration: 300,
                toValue: 28
            }).start()
        ]);
    }

    keyboardDidHide() {
        Animated.parallel([
            Animated.timing(this.topMargin, {
                duration: 300,
                toValue: 40
            }).start(),
            Animated.timing(this.textMargin, {
                duration: 300,
                toValue: 15
            }).start(),
            Animated.timing(this.textFont, {
                duration: 300,
                toValue: 23
            }).start()
        ]);
    }

    render() {
        return (
            <Animated.View style={[styles.container, { marginTop: this.topMargin }]}>
                <Image
                    source={logoImg}
                    style={[styles.image]}
                />
                <Animated.Text style={[styles.text, {
                    marginVertical: this.textMargin,
                    fontSize: this.textFont
                }]}
                >
                    MyTravel
                </Animated.Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.35
    },
    image: {
        width: 130,
        height: IMAGE_HEIGHT
    },
    text: {
        color: 'white',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    }
});

export default Logo;
