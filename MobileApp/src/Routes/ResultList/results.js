import React from 'react';
import { View, StyleSheet } from 'react-native';
import ResultsList from './Components/ResultList';

const ResultList = () => (
    <View style={styles.container}>
        <ResultsList />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ResultList;
