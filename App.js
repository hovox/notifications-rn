/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import ReactNative, { Platform, StyleSheet, Text, View, UIManager } from "react-native";
import NotificationList from "./notification/NotificationList";
import Recycler from "./notification/Recycler";
import Recycler2 from "./notification/Recycler2";
import MasonaryLayout from "./notification/MasonaryLayout";

type LayoutRectangle = {
  x: number,
  y: number,
  width: number,
  height: number
};
type LayoutChangeEvent = {
  nativeEvent: {
    layout: LayoutRectangle
  }
};

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {/* <NotificationList /> */}
        {/* <Recycler2 /> */}
        <MasonaryLayout />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
