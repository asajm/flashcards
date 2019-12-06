import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from './reducers';
import middleware from "./middleware";
import DeckList from "./components/DeckList";
import Constants from 'expo-constants'
import NewDeck from './components/NewDeck';
import { TabNavigator, StackNavigator } from 'react-navigation'
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

function FlashcardsStatusBar(props) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent {...props} />
    </View>
  )
}

const TabNav = TabNavigator({
  DeckList: { screen: () => <DeckList /> },
  NewDeck: { screen: () => <NewDeck /> },
})



export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        {/* <FlashcardsStatusBar barStyle="light-content" /> */}
        <FlashcardsStatusBar  />
        <TabNav />
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
