import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Spinner } from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import ConnectedListView from "../Components/ConnectedList";
import Ratings from "../Components/Ratings";
import { DATA_STATUS } from "../../../Actions/SearchActions";

const BusWokrTime = {
  WEEKEND: "weekend",
  WEEKDAY: "workday",
  ALL: "all"
};

const colors = [
  "rgb(178,108,194)",
  "rgb(87,166,57)",
  "rgb(242, 171, 27)",
  "rgb(236, 85, 76)"
];

class ResultList extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows([])
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== "error")
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.lines)
      });
  }

  _renderRow(rowdata, rowid) {
    const workday = this._workTime(rowdata);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        delayPressIn={20}
        key={rowid}
        onPress={() => Actions.details({ bus: rowdata })}
      >
        <View style={styles.listItemContainer}>
          <View
            style={[
              styles.itemLeftContainer,
              { borderColor: colors[rowid % 4] }
            ]}
          >
            <View style={styles.itemLeft}>
              <View style={styles.leftTop}>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "Roboto",
                    textAlign: "center"
                  }}
                >
                  {rowdata.departureTime}
                </Text>
              </View>
              <View style={styles.leftBottom}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={2}
                  style={{
                    fontSize: 20,
                    fontFamily: "Roboto",
                    textAlign: "center"
                  }}
                >
                  {workday}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.7, paddingTop: 10 }}>
            <View
              style={{
                flex: 0.7,
                flexDirection: "column",
                justifyContent: "flex-start"
              }}
            >
              <View style={{ paddingLeft: 15 }}>
                
                <ConnectedListView
                  circleColor={colors[rowid % 4]}
                  lineColor={colors[rowid % 4]}
                  data={[
                    {
                      title: rowdata.start.town
                    },
                    {
                      title: rowdata.end.town
                    }
                  ]}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1.3,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: "Roboto", fontSize: 18 }}>
                Оценка на потребителите
              </Text>
              <Ratings rating={rowdata.rate} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _workTime(bus) {
    let workDays;
    switch (bus.workTime) {
      case BusWokrTime.WEEKDAY: {
        workDays = "Делничен";
        break;
      }
      case BusWokrTime.WEEKEND: {
        workDays = "Събота и неделя";
        break;
      }
      case BusWokrTime.ALL: {
        workDays = "Всеки ден";
        break;
      }
      default:
        break;
    }

    return workDays;
  }

  _renderMessage() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, color: "#fff" }}>
          Не бяха намерени резултати
        </Text>
      </View>
    );
  }

  render() {
    const isLoading = this.props.status === DATA_STATUS.LOADING;
    const listViewProportion =
      this.state.dataSource.getRowCount() === 0 ? 0.5 : 1;
    return (
      <View style={styles.listContainer}>
        {isLoading ? (
          <Spinner color="red" />
        ) : (
          <ListView
            enableEmptySections
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderRow={(rowData, sectionId, rowId) =>
              this._renderRow(rowData, rowId)
            }
          />
        )}
        {listViewProportion !== 1 && !isLoading ? this._renderMessage() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "rgb(83,90,116)"
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "rgb(253,253,253)",
    marginTop: 10
  },
  itemLeftContainer: {
    flex: 0.3,
    minHeight: 50,
    borderLeftColor: "rgb(91, 157, 79)",
    borderLeftWidth: 7,
    paddingTop: 10
  },
  itemLeft: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 8,
    borderRightColor: "rgba(0,0,0,0.1)",
    borderRightWidth: 1,
    marginTop: 10
  },
  leftTop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4
  },
  leftBottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
    marginBottom: 20
  }
});

const mapStateToProps = state => ({
  lines: state.lines.data,
  status: state.lines.status
});

export default connect(mapStateToProps)(ResultList);
