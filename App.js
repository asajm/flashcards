import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import Constants from 'expo-constants'
import { Header } from 'react-navigation'
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from './reducers';
import { purple } from "./utils/colors";
import { StackNav } from "./components/Nav";
import { setLocalNotification } from "./utils/helper";
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    console.log(Platform.OS)
    console.log(Constants.statusBarHeight)
    console.log(Header.HEIGHT)
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='light-content' />
          <StackNav />
        </View>
      </Provider>
    );
  }
}
