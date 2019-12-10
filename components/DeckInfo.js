import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function DeckInfo(props) {
    console.log(props)

    const {title, questions} = props.deck
    return (
        <View>
            <Text>{title}</Text>
            <Text>{questions.length}</Text>
        </View>
    )
}
