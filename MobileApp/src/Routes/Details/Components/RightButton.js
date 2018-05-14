import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import firebase from 'react-native-firebase';

import { addLineToFavourites, removeLineFromFavourites } from '../../../Actions/UserActions';
import { TEXT_COLOR } from '../../../Configuration/colors';

const DROPDOWN_OPTIONS = {
    ADD_FAVOURITE: 'ADD_FAVOURITE',
    REMOVE_FAVOURITE: 'REMOVE_FAVOURITE',
    REPORT_PROBLEM: 'REPORT_PROBLEM',
    GIVE_REVIEW: 'GIVE_REVIEW'
};

class RightButton extends React.Component {
    constructor(props) {
        super(props);

        this.dropdownOption = '';

        this.state = {
            favourites: []
        };

        this.onSelect = this.onSelect.bind(this);
        this.onMenuPress = this.onMenuPress.bind(this);
        this.renderDropdownRow = this.renderDropdownRow.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.user)
            this.setState({ favourites: nextProps.user.favourites });
        else this.setState({ favourites: [] });
    }

    onMenuPress() {
        this.dropdownRef.show();
    }

    onSelect(selectIndex) {
        const { bus } = this.props.routeState;
        const index = parseInt(selectIndex, 10);

        const isUserAnonymous = firebase.auth().currentUser.isAnonyoums;

        switch (index){
        case 0: {
            if (this.dropdownOption === DROPDOWN_OPTIONS.ADD_FAVOURITE)
                this.props.addToFavourites(bus.id);
            else this.props.removeFromFavourites(bus.id);
            break;
        }
        case 1: {
            Actions.push('ReportProblem', { bus });
            break;
        }
        case 2: {
            if (!isUserAnonymous)
                Actions.ReviewPopup({ busID: bus.id });
            else Actions.MessageBox({ message: 'Нужна е регистрация за това действие' });
            break;
        }
        default: break;
        }
    }

    renderIcon(type) {
        switch (type) {
        case DROPDOWN_OPTIONS.ADD_FAVOURITE: {
            return (<Icon name="star" size={25} color="yellow" />);
        }
        case DROPDOWN_OPTIONS.REPORT_PROBLEM: {
            return (<MaterialIcons name="report-problem" size={25} color="red" />);
        }
        case DROPDOWN_OPTIONS.GIVE_REVIEW: {
            return (<MaterialIcons name="rate-review" size={25} color="#00cec9" />);
        }
        case DROPDOWN_OPTIONS.REMOVE_FAVOURITE: {
            return (<MaterialIcons name="star-border" size={25} color="yellow" />);
        }
        default: break;
        }

        return null;
    }

    renderDropdownRow(data) {
        return (
            <TouchableHighlight
                activeOpacity={0.9}
                style={styles.dropdownRow}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
                >
                    {this.renderIcon(data.action)}
                    <Text style={styles.dropdownText}>{data.value}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderSeparator() {
        return (<View style={styles.dropdownSeparator} key="separator" />);
    }

    render() {
        let addRemoveText;
        if (this.state.favourites
            && this.state.favourites.some(x => x.id === this.props.routeState.bus.id)) {
            addRemoveText = 'Премахни от Любими';
            this.dropdownOption = DROPDOWN_OPTIONS.REMOVE_FAVOURITE;
        } else {
            addRemoveText = 'Добави в Любими';
            this.dropdownOption = DROPDOWN_OPTIONS.ADD_FAVOURITE;
        }

        return (
            <View>
                <TouchableHighlight
                    activeOpacity={0.5}
                    onPress={this.onMenuPress}
                    style={styles.container}
                >
                    <Icon name="menu" size={32} style={styles.iconStyle} />
                </TouchableHighlight>
                <ModalDropdown
                    label=""
                    showsVerticalScrollIndicator={false}
                    ref={dropdown => { this.dropdownRef = dropdown; }}
                    textStyle={{ color: 'white' }}
                    options={[
                        {
                            value: addRemoveText,
                            action: this.dropdownOption
                        },
                        {
                            value: 'Докладвай проблем',
                            action: DROPDOWN_OPTIONS.REPORT_PROBLEM
                        },
                        {
                            value: 'Оцени',
                            action: DROPDOWN_OPTIONS.GIVE_REVIEW
                        }]}
                    dropdownStyle={styles.dropdownContainer}
                    renderRow={this.renderDropdownRow}
                    renderSeparator={this.renderSeparator}
                    onSelect={this.onSelect}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        color: TEXT_COLOR
    },
    container: {
        marginRight: 14,
        marginTop: 4
    },
    dropdownContainer: {
        elevation: 2,
        backgroundColor: '#0e0614',
        borderWidth: 0,
        marginRight: -2,
        height: 'auto'
    },
    dropdownRow: {
        backgroundColor: '#0e0614',
        height: 50
    },
    dropdownText: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '800',
        marginHorizontal: 4
    },
    dropdownSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#634c75'
    }
});

const mapDispatchToProps = dispatch => ({
    addToFavourites: busID => dispatch(addLineToFavourites(busID)),
    removeFromFavourites: busID => dispatch(removeLineFromFavourites(busID))
});

const mapStateToProps = state => ({
    routeState: state.route,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(RightButton);
