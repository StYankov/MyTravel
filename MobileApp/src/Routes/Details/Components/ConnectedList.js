import React, { Component } from 'react';
import {
    View,
    ListView,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const arrow = require('../../../Items/arrow.png');

class ConnectedList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            townsNum: 0
        };
    }

    componentWillMount() {
        const townsArr = this.combineTowns(this.props.bus);
        this.setState({
            dataSource: this.ds.cloneWithRows(townsArr),
            townsNum: townsArr.length
        });
    }

    combineTowns(bus) {
        if (bus === null) return [];
        let towns = [];

        towns.push(bus.start.town);
        
        const midFirst = bus.middle[0].town;

        if (midFirst === towns[0])
            towns = towns.concat(bus.middle.map(x => x.town).slice(1));
        else
            towns = towns.concat(bus.middle.map(x => x.town));

        if (towns[towns.length - 1] !== bus.end.town)
            towns.push(bus.end.town);

        
        return [...new Set(towns)];
    }

    _renderRow(data, rowId) {
        return (
            <View style={styles.cellContainer}>
                <View>
                    <Text style={styles.town}>{data}</Text>
                </View>
                { (rowId !== 0 && rowId !== this.state.townsNum - 1) ?
                    <Image source={arrow} style={styles.imag} />
                    :
                    <View style={styles.connect} />
                }
            </View>
        );
    }

    render() {

        return (
            <View>
                <ListView
                    enableEmptySections
                    initialListSize={1}
                    horizontal
                    style={{}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionId, rowId) =>
                        this._renderRow(rowData, Number(rowId))}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10
    },
    town: {
        color: '#000',
        fontWeight: '400',
        fontSize: 17
    },
    connect: {
        width: 19,
        height: 19,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#19B5FE',
        position: 'relative',
        zIndex: 2
    },
    imag: {
        width: 16,
        height: 16
    }
});

export default ConnectedList;
