
import React from 'react';
import { Platform } from 'react-native';
import DeckList from "./DeckList";
import NewDeck from './NewDeck';
import Deck from "./Deck";
import DeckCard from "./DeckCard";
import Quiz from "./Quiz";
import { TabNavigator, StackNavigator } from 'react-navigation'
import { white, purple } from "../utils/colors";
import NewCard from "./NewCard";
import { FontAwesome, Ionicons } from '@expo/vector-icons'

export const TabNav = TabNavigator({
  DeckList: {
    screen: (props) => <DeckList {...props} />,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: (props) => <NewDeck {...props} />,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
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
  Deck: {
    screen: (props) => <Deck {...props} />,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: (props) => <Quiz {...props} />,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DeckCard: {
    screen: (props) => <DeckCard {...props} />,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  NewCard: {
    screen: (props) => <NewCard {...props} />,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
})

