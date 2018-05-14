import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const dataList = [ {
    tel: '073 884 009',
    place: 'Автогара Благоевград'
},
{
    tel: '0884 405 621',
    place: 'БДЖ - Благоевград'
},
{
    tel: '0887 333 000',
    place: 'Благоевград - Такси'
},
{
    tel: '0888 83 22 22',
    place: 'Благоевград - Такси'
},
{
    tel: '0888 83 22 22',
    place: 'Автогара Сандански'
},
{
    tel: '0895433364',
    place: 'БДЖ - Сандански'
},
{
    tel: '0895 433364',
    place: 'Градски транспорт Сандански'
},
{
    tel: '0888 66 55 88',
    place: 'Такси - Сандански'
}];

function renderRow(rowData){
    return (
        <View style={styles.listContainer}>
            <View style={styles.listContent}>
                <Entypo name="phone" size={20} style={styles.icon} />
                <Text style={styles.text}>{rowData.place}</Text>
                <Text style={styles.text}>{rowData.tel}</Text>
            </View>
        </View>
    )
}

const Info = () => (
    <View style={styles.container}>
        <FlatList
            data={dataList}
            renderItem={({ item }) => renderRow(item)}
            ItemSeparatorComponent={() => <View  style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#ccc' }} />}
            keyExtractor={(item, index) => String(index)}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 5
    },
    listContent: {
        flexDirection: 'row',
        padding: 5
    },
    icon: {
        paddingHorizontal: 5
    },
    text: {
        fontSize: 17,
        padding: 5
    }

});

export default Info;
