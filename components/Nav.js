
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

export const TabNav = TabNavigator({
    DeckList: { screen: (props) => <DeckList {...props}/> },
    NewDeck: { screen: (props) => <NewDeck {...props} /> },
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

  export const StackNav = StackNavigator({
    Home: { screen: TabNav },
    Deck: { screen: (props) => <Deck {...props}/> },
    Quiz: { screen: (props) => <Quiz {...props}/> },
    DeckCard: { screen: (props) => <DeckCard {...props}/> },
    NewCard: { screen: (props) => <NewCard {...props}/> },
  })

