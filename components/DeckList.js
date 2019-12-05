import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import Deck from './Deck'

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

const decks_ = [
    {
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
    {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
]

class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(receiveDecks({ decks }))
    }

    renderDeck = ({ item }) => {
        console.log(item)
        return <Deck title={item.title} cards={item.questions.length} />
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

        return (
            <View style={styles.container}>
                <FlatList
                    data={decks_}
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

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)