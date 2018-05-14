import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Row from './Row';
import Footer from './ListFooter';

class FavouritesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.favourites
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.favourites)
            this.setState({ dataSource: nextProps.favourites });
    }

    render() {
        let listData = this.state.dataSource;
        
        for (let i = 0; i < listData.length; i++)
            listData[i].key = `item${i}`;

        if (listData.length === 0)
            listData = null;

        return (
            <FlatList
                style={styles.container}
                data={listData}
                renderItem={({ item, index }) => (<Row removeFav={this.props.removeFav} key={`row_${index}`} {...item} />)}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                ListHeaderComponent={() => <Header />}
                ListFooterComponent={() => <Footer />}
            />
        );
    }
}

const Header = () => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Любими</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flex: 1,
        padding: 10,
        paddingLeft: 18,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#d0d0d0'
    },
    headerText: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'Roboto'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8e8e8e',
        marginHorizontal: 10
    }
});

export default FavouritesList;
