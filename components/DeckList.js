import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { receiveDecks } from "../actions";

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
        this.props.dispatch(receiveDecks({ decks }))
    }

    render() {
        const { decks } = this.props
        return (
            <View style={styles.container}>
            {
                decks
                    ? Object.keys(decks).map(deck => (
                        <Text key={deck}>{`${decks[deck].title} (${decks[deck].questions.length})`}</Text>
                    ))
                    : <Text>loading</Text>
            }
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

function mapStateToProps({decks}) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)