import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function DeckInfo({ deck, style = {} }) {
    const { title, questions } = deck
    const size = questions.length
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{size} {size === 1 ? 'card' : 'cards'}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f00'
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 21,
        color: '#555'
    }
});


1
2
3
5
8
13
21
34