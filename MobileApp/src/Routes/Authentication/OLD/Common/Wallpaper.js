import React from 'react';
import {
    StyleSheet,
    ImageBackground,
} from 'react-native';

import bgSrc from '../images/wallpaper.png';

const WallPaper = props => (
    <ImageBackground style={styles.picture} resizeMode="cover" source={bgSrc}>
        {props.children}
    </ImageBackground>
);

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default WallPaper;
