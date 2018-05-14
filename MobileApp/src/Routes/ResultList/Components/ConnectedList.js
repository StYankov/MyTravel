import React, { Component } from 'react';

import {
    StyleSheet,
    ListView,
    View,
    Text
} from 'react-native';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const defaultCircleSize = 16;
const defaultCircleColor = '#007AFF';
const defaultLineWidth = 2;
const defaultLineColor = '#007AFF';
const defaultTimeTextColor = 'black';
const defaultDotColor = 'white';
const defaultInnerCircle = 'none';

// onLayout={evt => { if (!this.state.x && !this.state.width)
// { const { x, width } = evt.nativeEvent.layout; this.setState({ x, width }); } }}
// needed this.state.width set to 0

export default class Timeline extends Component {
    constructor(props, context) {
        super(props, context);

        this._renderRow = this._renderRow.bind(this);

        this.renderDetail = this._renderDetail.bind(this);
        this.renderCircle = this._renderCircle.bind(this);
        this.renderEvent = this._renderEvent.bind(this);
        this.isRenderSeparator = this.props.separator != null ? this.props.separator : true;

        this.state = {
            data: this.props.data,
            dataSource: ds.cloneWithRows(this.props.data),
            x: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            dataSource: ds.cloneWithRows(nextProps.data)
        });
    }

    _renderRow(rowData, sectionID, rowID) {
        let content = null;

        content = (
            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                {this.renderEvent(rowData, sectionID, rowID)}
                {this.renderCircle(rowData, sectionID, rowID)}
            </View>
        );

        return (
            <View key={rowID}>
                {content}
            </View>
        );
    }

    _renderEvent(rowData, sectionID, rowID) {
        const { lineWidth } = this.props;
        const isLast = this.state.data.slice(-1)[0] === rowData;
        const lineColor = isLast ? ('rgba(0,0,0,0)') : this.props.lineColor;
        const opStyle = {
            borderColor: lineColor,
            borderLeftWidth: lineWidth,
            borderRightWidth: 0,
            marginLeft: 10,
            paddingLeft: 10
        };
          
        return (
            <View style={[styles.details, opStyle]}>
                {this.renderDetail(rowData, sectionID, rowID)}
            </View>
        );
    }

    _renderDetail(rowData, sectionID, rowID) {
        const title = <Text style={[styles.title]}>{rowData.title}</Text>;
        const bottomMargin = (Number(rowID) === this.state.data.length - 1) ? 5 : 16;
        return (
            <View style={[styles.container, {
                marginBottom: bottomMargin,
                paddingLeft: 5,
                marginTop: -5
            }]}
            >
                {title}
            </View>
        );
    }

    _renderCircle() {
        const circleSize = this.props.circleSize ? this.props.circleSize : defaultCircleSize;
        const circleColor = this.props.circleColor ? this.props.circleColor : defaultCircleColor;
        const lineWidth = this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;

        const circleStyle = {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: circleColor,
            left: 3// this.state.x - (circleSize / 2) + ((lineWidth - 1) / 2)
        };

        const dotStyle = {
            height: circleSize / 2 + 1,
            width: circleSize / 2 + 1,
            borderRadius: circleSize / 4,
            backgroundColor: 'rgb(253,253,253)'
        };

        const innerCircle = (<View style={[styles.dot, dotStyle]} />);

        return (
            <View style={[styles.circle, circleStyle]}>
                {innerCircle}
            </View>
        );
    }

    _renderSeparator() {
    // if (this.isRenderSeparator)
    //   return (
    //     <View style={[styles.separator, this.props.separatorStyle]}></View>
    //   )
    // else
    //   return null
        return null;
    }

    render() {
        return (
            <View style={[styles.container, this.props.style, { justifyContent: 'center' }]}>
                <ListView
                    style={[styles.listview]}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    automaticallyAdjustContentInsets={false}
                    {...this.props.options}
                />
            </View>
        );
    }
}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor,
    innerCircle: defaultInnerCircle
};

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listview: {
        flex: 1
    },
    sectionHeader: {
        marginBottom: 15,
        backgroundColor: '#007AFF',
        height: 30,
        justifyContent: 'center'
    },
    sectionHeaderText: {
        color: '#FFF',
        fontSize: 18,
        alignSelf: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    timeContainer: {
        minWidth: 45
    },
    time: {
        textAlign: 'right',
        color: defaultTimeTextColor
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 10,
        position: 'absolute',
        left: -8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: defaultDotColor
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold'
    },
    details: {
        borderLeftWidth: defaultLineWidth,
        flexDirection: 'column',
        flex: 1
    },
    description: {
        marginTop: 10
    },
    separator: {
        height: 1,
        backgroundColor: '#aaa',
        marginTop: 10,
        marginBottom: 10
    }
});

// var innerCircle = null
// switch (this.props.innerCircle) {
//   case 'icon':
//     let iconSource = rowData.icon ? rowData.icon : this.props.icon
//     let iconStyle = {
//       height: circleSize,
//       width: circleSize,
//     }
//     innerCircle = (<Image source={iconSource} style={[iconStyle, this.props.iconStyle]} />)
//     break;
//   case 'dot':
//     let dotStyle = {
//       height: circleSize / 2,
//       width: circleSize / 2,
//       borderRadius: circleSize / 4,
//       backgroundColor: rowData.dotColor ? rowData.dotColor :
// this.props.dotColor ? this.props.dotColor : defaultDotColor
//     }
//     innerCircle = (<View style={[styles.dot, dotStyle]} />)
//     break;
// }
