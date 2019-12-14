import React, { Component } from "react";
import { View, Button, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import DeckInfo from "./DeckInfo";
import Constants from 'expo-constants'
import { Header } from 'react-navigation'

class DeckCard extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        console.log(title)
        return { title }
    }

    // static navigationOptions = {
    //     title: 'Home',
    //     headerStyle: {
    //         backgroundColor: '#f4511e',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //         fontWeight: 'bold',
    //     },
    // };

    goNewCard = () => {
        const { title } = this.props.deck
        const { navigate } = this.props.navigation
        navigate(
            'NewCard',
            { title }
        )
    }

    goQuiz = () => {
        const { title } = this.props.deck
        const { navigate } = this.props.navigation
        navigate(
            'Quiz',
            { title }
        )
    }

    render() {
        const { deck } = this.props
        console.log(Platform.OS)
        console.log(Constants.statusBarHeight)
        console.log(Header.HEIGHT)
        return (
            <View style={styles.container}>
                <DeckInfo
                    style={styles.header}
                    deck={deck}
                />
                <View style={styles.btnContainer}>
                    <View style={styles.btn}><Button
                        title='Add Card'
                        onPress={this.goNewCard}
                    /></View>
                    <View style={styles.btn}><Button
                        title='Start Quiz'
                        onPress={this.goQuiz}
                    /></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#00f'
    },
    header: {
        paddingTop: 56,
        paddingBottom: 34,
    },
    btnContainer: {
        flexDirection: 'row',
        marginHorizontal: 13,
    },
    btn: {
        flex:1,
        paddingTop: 21,
        paddingHorizontal: 5,
    },
});


function mapStateToProps(state, props) {
    const { title } = props.navigation.state.params
    return {
        deck: state[title]
    }
}

export default connect(mapStateToProps)(DeckCard)