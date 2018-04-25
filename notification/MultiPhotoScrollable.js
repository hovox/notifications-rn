// @flow

import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from "react-native";

type Props = {
  leftUrl: string,
  rightUrl: string,
  title: string,
  photos: Array<string>
};

class MultiPhotoScrollable extends PureComponent<Props> {
  // shouldComponentUpdate(nextProps: Props, nextState: any) {
  //   if (
  //     this.props.leftUrl === nextProps.leftUrl &&
  //     this.props.rightUrl === nextProps.rightUrl &&
  //     this.props.photos.length == nextProps.photos.length
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  userNamePressed(params: any) {
    alert(params);
  }

  render() {
    const w = Dimensions.get("window").width;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Image style={styles.leftImage} source={{ uri: this.props.leftUrl }} resizeMode="cover" />
          <Text style={styles.title} numberOfLines={0}>
            <Text style={{ fontWeight: "700" }} onPress={this.userNamePressed.bind(this)}>
              {"@hov"}
            </Text>
            <Text>{" liked your image(s)"}</Text>
            <Text style={{ fontSize: 9, color: "blue" }}>{" 1 minute ago"}</Text>
          </Text>

          <Image style={styles.rightImage} source={{ uri: this.props.rightUrl }} resizeMode="cover" />
        </View>
        <View style={[{ width: w }, styles.scrollView]}>
          {/* <ScrollView horizontal style={[{ width: w }, styles.scrollView]} contentContainerStyle={styles.scrollContainer}> */}
          {this.props.photos.map(url => (
            <Image key={url} style={styles.scrollImage} source={{ uri: url }} resizeMode="cover" />
          ))}
          {/* </ScrollView> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 5,
    backgroundColor: "lightgrey"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  leftImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5
    // backgroundColor: "grey"
  },
  rightImage: {
    width: 50,
    height: 50,
    // backgroundColor: "grey"
    borderRadius: 25
  },
  scrollImage: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginLeft: 15
  },
  scrollView: {
    height: 45,
    flexDirection: "row"
  },
  scrollContainer: {
    alignItems: "center"
  },
  title: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 10
  }
});

export default MultiPhotoScrollable;
