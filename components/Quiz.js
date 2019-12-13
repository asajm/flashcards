import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";

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
            <Button title='Correct' onPress={() => correctAction(true)} />
            <Button title='Incorrect' onPress={() => correctAction(false)} />
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

    setCorrect = (isCorrect) => {
        let view = QUESTION
        if (state.progress + 1 >= state.size) {
            view = COMPLETE
            clearLocalNotification().then(setLocalNotification)
        }
        this.setState((state) => {
            return {
                correct: state.correct + isCorrect ? 1 : 0,
                progress: state.progress + 1,
                view: view,
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
                        />)

                }
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    const { title } = props.navigation.state.params
    return {
        deck: state[title],
    }
}

export default connect(mapStateToProps)(Quiz)