import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { connect } from "react-redux";
import { addDeck } from "../actions";



class NewDeck extends Component {
    state = {
        value: '',
    }

    onChangeText = (value) => {
        this.setState(() => ({ value }))
    }

    submit = () => {
        const title = this.state.value
        this.props.dispatch(addDeck(title))
        this.setState(() => ({ value: '' }))
        this.props.navigation.navigate(
            'DeckList',
            { title }
        )
    }

    render() {
        const { value } = this.state
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder='please type the deck name'
                    onChangeText={this.onChangeText}
                    value={value}
                />
                <Button
                    title='submit'
                    onPress={this.submit}
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