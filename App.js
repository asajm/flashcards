import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from './reducers';
import middleware from "./middleware";
import DeckList from "./components/DeckList";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <DeckList></DeckList>
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
