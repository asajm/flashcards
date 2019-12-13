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
            <View style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.field}
                    placeholder='please type the deck name'
                    onChangeText={this.onChangeText}
                    value={value}
                />
                <Button
                    // style={styles.btn}
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
        paddingTop: 56,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    field: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 34,
        marginBottom: 21,
        marginHorizontal: 5,
        paddingHorizontal: 10,
    },
    btn: {
        paddingTop: 21,
        marginHorizontal: 5,
        paddingHorizontal: 10,
    }
});

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(NewDeck)