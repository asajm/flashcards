import React, { Component } from "react";
import { View, Text } from "react-native";

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        console.log(title)
        return { title }
    }

    render() {
        return (
            <View>
                <Text>Deck View</Text>
            </View>
        )
    }
}

export default Deck