
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions/index";

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deck]: {
                    ...state[action.deck],
                    questions: state[action.deck].questions.concat(action.card.question),
                }
            }
        default:
            return state
    }
}

export default decks

/*
# this is the shape of deck
{
    <deck name>: {
        title: <deck name>,
        questions: [
            {
                question: <question>,
                answer: <answer>
            }
        ]
    }
}

# sample:
const shape = {
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
*/