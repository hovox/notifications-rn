// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

type Props = { title: string, leftUrl: string, rightUrl: string };
class SinglePhoto extends React.PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.leftImage} source={{ uri: this.props.leftUrl }} resizeMode="cover" />
        <Text style={styles.title} numberOfLines={0}>
          {this.props.title}
        </Text>

        <Image style={styles.rightImage} source={{ uri: this.props.rightUrl }} resizeMode="cover" />
      </View>
      // <View style={styles.container}>
      //   <Text style={styles.title} numberOfLines={0}>
      //     {this.props.title}
      //   </Text>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  leftImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  rightImage: {
    width: 50,
    height: 50
  },
  title: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10
  }
});

export default SinglePhoto;
