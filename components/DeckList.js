import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import DeckInfo from './DeckInfo'
import { decks } from "../utils/data";


class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(receiveDecks(decks))
    }

    componentDidUpdate() {
        const { navigation } = this.props
        const { params } = navigation.state
        if (navigation.state.params) {
            const { title } = params
            if (title) {
                setTimeout(() => {
                    navigation.navigate(
                        'DeckCard',
                        { title }
                    )
                }, 500);
            }
        }
    }

    renderDeck = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.cell}
                onPress={() => this.props.navigation.navigate(
                    'DeckCard',
                    { title: item.title }
                )}
            >
                <DeckInfo deck={item} />
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.props
        if (typeof decks === 'undefined') {
            return (
                <View>
                    <Text>empty</Text>
                </View>
            )
        }

        const _decks = Object.keys(decks).map((k) => decks[k])
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={_decks}
                    renderItem={this.renderDeck}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f00'
    },
    list: {
        flex: 1,
        width: Dimensions.get('window').width,
    },
    cell: {
        flex: 1,
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
    }
});

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckList)