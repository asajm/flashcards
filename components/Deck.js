import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Deck({title, cards}) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{cards}</Text>
        </View>
    )
}
