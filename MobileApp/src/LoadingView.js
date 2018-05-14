import React from 'react';
import { View, StyleSheet } from 'react-native';

const LoadingView = () => (
    <View style={styles.container}>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple'
    }
});

export default LoadingView;
