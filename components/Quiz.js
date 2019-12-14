import React, { Component } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";
import { red, green } from "../utils/colors";

const QUESTION = 'QUESTION'
const ANSWER = 'ANSWER'
const COMPLETE = 'COMPLETE'

function QuizCompleted({ correct, size }) {
    return (
        <View style={styles.quizContainer}>
            <View style={styles.cardContainer}>
                <Text>{`The Score`}</Text>
                <Text style={styles.cardBody}>{`${(100 * correct / size).toFixed(2)}%`}</Text>
            </View>
        </View>
    )
}

function QuizRuning({ view, card, viewQuestionAction, viewAnswerAction, correctAction }) {
    return (
        <View style={styles.quizContainer}>
            <View style={styles.cardContainer}>
                <Text style={styles.cardBody}>{view === ANSWER ? card.answer : card.question}</Text>
                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                        <Button
                            title={view === ANSWER ? 'Question' : 'Answer'}
                            onPress={view === ANSWER ? viewQuestionAction : viewAnswerAction}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <Button title='Correct' color={green} onPress={() => correctAction(true)} />
                </View>
                <View style={styles.btn}>
                    <Button title='Incorrect' color={red} onPress={() => correctAction(false)} />
                </View>
            </View>
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
        if (this.state.progress + 1 >= this.state.size) {
            view = COMPLETE
            clearLocalNotification().then(setLocalNotification)
        }
        this.setState((state) => {
            return {
                correct: state.correct + (isCorrect ? 1 : 0),
                progress: state.progress + 1,
                view: view,
            }
        })
    }

    render() {
        const { deck } = this.props
        const { correct, progress, size, view } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.cardHeader}>{`${correct} / ${size}`}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 8,
        width: Dimensions.get('window').width,
    },
    quizContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    cardHeader: {
        fontStyle: "italic",
        color: '#555'
    },
    cardContainer: {
        paddingBottom: 21,
        paddingHorizontal: 10,

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginHorizontal: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cardBody: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 21,
    },
    btnContainer: {
        flexDirection: 'row',
        paddingTop: 21,
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        paddingHorizontal: 10,
    },
});

function mapStateToProps(state, props) {
    const { title } = props.navigation.state.params
    return {
        deck: state[title],
    }
}

export default connect(mapStateToProps)(Quiz)