import React from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Keyboard
} from 'react-native';
import StarRatings from 'react-native-star-rating';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { voteLine } from '../../Actions/UserActions';

const { width } = Dimensions.get('window');

class ReviewPopup extends React.Component {
    constructor() {
        super();

        this.state = {
            rating: 0,
            optionalReviewText: ''
        };

        this.hide = this.hide.bind(this);
        this.onPress = this.onPress.bind(this);

        this.ComponentOpacity = new Animated.Value(1);
    }

    onPress(vote) {
        this.setState({ rating: Number(vote) });
    }

    onSend(){
        this.props.vote(this.props.busID, this.state.rating, this.state.optionalReviewText);
    }

    hide(forceQuit) {
        if (this.state.optionalReviewText === '' || forceQuit)
            Animated.timing(this.ComponentOpacity, {
                duration: 300,
                toValue: 0.01
            }).start(() => {
                Actions.pop();
            });
        else Keyboard.dismiss();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.hide()}>
                <Animated.View
                    style={[styles.backgroundContainer, { opacity: this.ComponentOpacity }]}
                >
                    <View style={styles.contentContainer}>
                        <Text style={styles.textStyle}>Оцени</Text>
                        <StarRatings
                            selectedStar={args => this.onPress(args)}
                            starSize={35}
                            emptyStarColor="rgb(248, 0, 84)"
                            starColor="rgb(248, 0, 84)"
                            rating={this.state.rating}
                        />
                        <TextInput
                            style={styles.textInput}
                            underlineColorAndroid="rgb(248,0,84)"
                            placeholder="Доъплнителни отзиви (незадължително)"
                            onChangeText={text => this.setState({ optionalReviewText: text })}
                        />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.btnBox}
                                activeOpacity={0.7}
                                onPress={() => this.hide(true)}
                                key="btnTextBoxCancel"
                            >
                                <Text style={styles.btnText}>Назад</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnBox}
                                activeOpacity={0.7}
                                onPress={() => this.onSend()}
                                key="btnTextBoxOk"
                            >
                                <Text style={styles.btnText}>Изпрати</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    contentContainer: {
        width: width - 50,
        backgroundColor: '#9c88ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        padding: 10,
        paddingBottom: 0
    },
    textStyle: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        fontFamily: 'Roboto',
        marginBottom: 5
    },
    btnBox: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        margin: 5,
        marginBottom: 0
    },
    btnText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: 'rgb(248,0,84)'
    },
    textInput: {
        width: width - 80,
        marginVertical: 5,
        color: '#f5f6fa'
    },
    buttonsContainer: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5
    }
});

const mapDispatchToProps = dispatch => ({
    vote: (busID, grade, comment) => dispatch(voteLine(busID, grade, comment))
});

export default connect(null, mapDispatchToProps)(ReviewPopup);
