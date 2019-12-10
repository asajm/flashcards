import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import DeckInfo from './DeckInfo'

const decks = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(receiveDecks(decks))
    }

    componentDidUpdate() {
        const { navigation } = this.props
        const { params } = navigation.state
        if (navigation.state.params) {
            const { title } = params
            if (title) {
                setTimeout(() => {
                    navigation.navigate(
                        'DeckCard',
                        { title }
                    )
                }, 500);
            }
        }
    }

    renderDeck = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'DeckCard',
                    { title: item.title }
                )}
            >
                <DeckInfo deck={item} />
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.props
        if (typeof decks === 'undefined') {
            return (
                <View>
                    <Text>empty</Text>
                </View>
            )
        }

        const _decks = Object.keys(decks).map((k) => decks[k])
        return (
            <View style={styles.container}>
                <FlatList
                    data={_decks}
                    renderItem={this.renderDeck}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckList)