import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";

const QUESTION = 'QUESTION'
const ANSWER = 'ANSWER'
const COMPLETE = 'COMPLETE'

function QuizCompleted({ correct, size }) {
    return (
        <View>
            <Text>{`your score is ${(100 * correct / size).toFixed(2)}%`}</Text>
        </View>
    )
}
function CardQuestion({ card, action }) {
    return (
        <View>
            <Text>{card.question}</Text>
            <Button title='Answer' onPress={action} />
        </View>
    )
}
function CardAnswer({ card, action }) {
    return (
        <View>
            <Text>{card.answer}</Text>
            <Button title='Question' onPress={action} />
        </View>
    )
}
function QuizRuning({ view, viewQuestionAction, viewAnswerAction, correctAction, incorrectAction, ...props }) {
    return (
        <View>
            {view === QUESTION && (<CardQuestion action={viewAnswerAction} {...props} />)}
            {view === ANSWER && (<CardAnswer action={viewQuestionAction} {...props} />)}
            <Button title='Correct' onPress={correctAction} />
            <Button title='Incorrect' onPress={incorrectAction} />
        </View>
    )
}




class Quiz extends Component {
    state = {
        correct: 0,
        progress: 0,
        size: this.props.deck.questions.length,
        view: QUESTION
    }

    viewAnswer = () => {
        this.setState({ view: ANSWER })
    }
    viewQuesiton = () => {
        this.setState({ view: QUESTION })
    }

    setCorrect = () => {
        this.setState((state) => {
            return {
                correct: state.correct + 1,
                progress: state.progress + 1,
                view: state.progress + 1 < state.size ? state.view : COMPLETE,
            }
        })
    }

    setIncorrect = () => {
        this.setState((state) => {
            return {
                progress: state.progress + 1,
                view: state.progress + 1 < state.size ? state.view : COMPLETE,
            }
        })
    }

    render() {
        const { deck } = this.props
        const { correct, progress, size, view } = this.state

        return (
            <View>
                <Text>{`${correct} / ${size}`}</Text>
                {
                    view == COMPLETE
                        ? (<QuizCompleted
                            correct={correct}
                            size={size}
                        />)
                        : (<QuizRuning
                            view={view}
                            card={deck.questions[progress]}
                            viewAnswerAction={this.viewAnswer}
                            viewQuestionAction={this.viewQuesiton}
                            correctAction={this.setCorrect}
                            incorrectAction={this.setIncorrect}
                        />)

                }
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    const { title } = props.navigation.state.params
    // console.log(state[title])
    return {
        deck: state[title],
    }
}

export default connect(mapStateToProps)(Quiz)