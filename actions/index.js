export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_DECK = 'UPDATE_DECK'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(title) {
    const deck = {
        title,
        questions: []
    }
    return {
        type: ADD_DECK,
        deck
    }
}

export function updateDeck(deck) {
    return {
        type: UPDATE_DECK,
        deck
    }
}


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