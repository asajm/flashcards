import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

export default function Deck({title, cards}) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{cards}</Text>
        </View>
    )
}
