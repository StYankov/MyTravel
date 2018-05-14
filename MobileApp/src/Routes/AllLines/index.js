import React from 'react';
import { View, Text, SectionList, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Spinner } from "native-base";
import { Actions } from 'react-native-router-flux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'react-native-firebase';

const { width } = Dimensions.get('screen');

class AllLines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      loading: true
    }
  }
  async componentDidMount() {
    // fetch lines and sort
    try {
      this.setState({ loading: true });
      const rawLines = await firebase.database().ref('buses').once('value').then(x => x.val());

      const linesSorted = Object.keys(rawLines).map((val, i) => {
        const bus = rawLines[val];
        bus.id = val;
        return bus;
      }).sort(x => x.start.town).reverse();

      this.setState({ lines: linesSorted, loading: false });
    }
    catch (ex) {
      this.setState({ loading: false });
    }
  }

  splitIntoSections() {
    if (this.state.lines.length === 0) return [];

 
    const sections = [];
    const towns = this.state.lines.map(x => x.start.town);
    const set = new Set(towns);

    set.forEach(key => {
      sections.push({ title: key , data: this.state.lines.filter(line => line.start.town === key).reverse() });
    });

    return sections;
  }

  _renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback onPress={() => Actions.singleDetails({ bus: item })}>
        <View style={[styles.item, (index % 2 === 0) ? styles.blue : styles.gray]}>
          <MaterialIcons name="directions-bus" color="#000" size={20} style={{ paddingRight: 15, paddingTop: 3 }} />
          <Text style={styles.itemText}>{item.start.town} - {item.end.town}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.itemTime}>{item.departureTime}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderSection({ section: { title } }) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    );
  }

  _renderEmptyContent() {
    return (
      <View>
        <Text style={{ textAlign: 'center', paddingTop: 50, color: '#000', fontSize: 20 }}>Не беше намерено нищо</Text>
      </View>
    );
  }

  _renderItemSeparator() {
    return (
      <View style={styles.separator} />
    );
  }
  render() {
    const splitted = this.splitIntoSections();
    return (
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        {this.state.loading ? <Spinner color="red" /> :
          <SectionList
            keyExtractor={(item, index) => `${Math.random()}${index}`}
            sections={splitted}
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSection}
            ListEmptyComponent={this._renderEmptyContent}
          />
        }
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={Actions.landingPage}>
            <View style={styles.button}>
              <Feather name="search" size={25} color='#fff' />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={Actions.allLines}>
            <View style={styles.button}>
              <Feather name="list" size={25} color='#ff4500' />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    padding: 5,
    backgroundColor: '#fff'
  },
  sectionTitle: {
    paddingLeft: 10,
    color: '#000',
    fontSize: 20,
    fontWeight: '600'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#000'
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    flex: 1,
    flexDirection: 'row',
  },
  blue: {
    backgroundColor: '#96C0CE'
  },
  gray: {
    backgroundColor: '#eee'
  },
  itemText: {
    color: '#000',
    fontSize: 18
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemTime: {
    color: '#000',
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'right'
  },
  btnContainer: {
    backgroundColor: '#6a3281',
    height: 50,
    flexDirection: 'row'
  },
  button: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AllLines;
