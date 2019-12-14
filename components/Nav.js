
import React from 'react';
import { Text, Platform, View } from 'react-native';
import DeckList from "./DeckList";
import NewDeck from './NewDeck';
import Deck from "./Deck";
import DeckCard from "./DeckCard";
import Quiz from "./Quiz";
import { TabNavigator, StackNavigator } from 'react-navigation'
import { white, purple, green } from "../utils/colors";
import NewCard from "./NewCard";
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'

function Tab({ Screen, ...props }) {
  return (<View style={{ flex: 1 }}>
    {Platform.OS === 'ios' && <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }} />}
    <Screen {...props} />
  </View>)
}
export const TabNav = TabNavigator({
  DeckList: {
    screen: (props) => <Tab Screen={DeckList} {...props} />,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: (props) => <Tab Screen={NewDeck} {...props} />,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export const StackNav = StackNavigator({
  Home: { screen: TabNav },
  Quiz: {
    screen: (props) => <Quiz {...props} />,
    navigationOptions: ({ navigation }) => {
      const { title } = navigation.state.params
      return { title: `${title} (quiz)` }
    },
  },
  DeckCard: {
    screen: (props) => <DeckCard {...props} />,
    navigationOptions: ({ navigation }) => {
      const { title } = navigation.state.params
      return { title }
    },
  },
  NewCard: {
    screen: (props) => <NewCard {...props} />,
    navigationOptions: ({ navigation }) => {
      const { title } = navigation.state.params
      return { title: `${title} (new card)` }
    },
  },
}, {
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: purple,
    }
  }
})

