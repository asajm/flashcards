import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from './reducers';
import Constants from 'expo-constants'
import { purple } from "./utils/colors";
import { StackNav } from "./components/Nav";
import { setLocalNotification } from "./utils/helper";
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent {...props} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <FlashcardsStatusBar backgroundColor={purple} barStyle="light-content" />
        <StackNav />
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
