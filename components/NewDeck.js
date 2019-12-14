import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
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
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.field}
                        placeholder='please type the deck name'
                        onChangeText={this.onChangeText}
                        value={value}
                    />
                </View>
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
        paddingTop: 56,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    fieldContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        marginTop: 34,
        marginBottom: 21,
        // marginHorizontal: 5,
        paddingHorizontal: 10,
    },
    field: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        alignSelf: 'center',
    },
});

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(NewDeck)