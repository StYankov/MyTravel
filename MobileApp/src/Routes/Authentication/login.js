import React from 'react';

import { ImageBackground, TouchableWithoutFeedback, Keyboard, View, TextInput } from 'react-native';
import Logo from './Logo';
import Form from './Form';
import bgSrc from './images/wallpaper.png';

// eslint-disable-next-line
class Login extends React.Component {
    render() {
        return (
            <ImageBackground source={bgSrc} style={{ flex: 1 }} >
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}> */}
                <Logo flex={0.30} toValFlex={0.3} />
                <TextInput />
                {/* </View>
                </TouchableWithoutFeedback> */}
            </ImageBackground>
        );
    }
}

export default Login;
