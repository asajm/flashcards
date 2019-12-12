import React, { Component } from "react";
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { connect } from "react-redux";
import { updateDeck } from '../actions/index'



class NewCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    onChangeQuestion = (question) => {
        this.setState(() => ({ question }))
    }

    onChangeAnswer = (answer) => {
        this.setState(() => ({ answer }))
    }

    submit = () => {
        const { deck } = this.props
        const { question, answer } = this.state
        this.props.dispatch(updateDeck({
            ...deck,
            questions: [...deck.questions, { question, answer }]
        }))
        this.setState(() => ({
            question: '',
            answer: ''
        }))
        this.props.navigation.goBack()
    }

    render() {
        const { question, answer } = this.state
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder='please type the question'
                    onChangeText={this.onChangeQuestion}
                    value={question}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder='please type the answer'
                    onChangeText={this.onChangeAnswer}
                    value={answer}
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

function mapStateToProps(state, props) {
    const { title } = props.navigation.state.params
    // console.log(state[title])
    return {
        deck: state[title],
    }
}

export default connect(mapStateToProps)(NewCard)