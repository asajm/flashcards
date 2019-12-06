import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import { connect } from "react-redux";
import { receiveDecks, addDeck } from "../actions";
import Deck from './Deck'
import { getDeckInfo } from "../utils/helper";



class NewDeck extends Component {
    state = {
        text: ''
    }

    onChangeText = (text) => {
        this.setState(() => ({ text }))
    }

    submit = () => {
        const title = this.state.text
        console.log({
            [title]: getDeckInfo(title)
        })

        this.props.dispatch(addDeck(title))
    }

    renderDeck = ({ item }) => {
        console.log(item)
        return <Deck title={item.title} cards={item.questions.length} />
    }

    render() {
        const { decks } = this.props
        const _decks = Object.keys(decks).map((k) => decks[k])
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder='please type the deck name'
                    onChangeText={this.onChangeText}
                />
                <Button
                    title='submit'
                    onPress={this.submit}
                />
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

export default connect(mapStateToProps)(NewDeck)