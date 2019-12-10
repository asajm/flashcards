import React, { Component } from "react";
import { View, Button } from "react-native";
import { connect } from "react-redux";
import DeckInfo from "./DeckInfo";

class DeckCard extends Component {
    goNewCard = (x) => {
        const { title } = this.props.deck
        const { navigate } = this.props.navigation
        navigate(
            'NewCard',
            { title }
        )
    }

    render() {
        const { deck } = this.props
        return (
            <View>
                <DeckInfo deck={deck} />
                <Button
                    title='Add Card'
                    onPress={this.goNewCard}
                />
                <Button
                    title='Start Quiz'
                    onPress={this.submit}
                />
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    const { title } = props.navigation.state.params
    return {
        deck: state[title]
    }
}

export default connect(mapStateToProps)(DeckCard)