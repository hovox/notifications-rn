// @flow

import React, { Component, PureComponent } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from "react-native";

type Props = {
  leftUrl: string,
  rightUrl: string,
  title: string,
  photos: Array<string>
};

class MultiLike extends PureComponent<Props> {
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
        <Image style={styles.leftImage} source={{ uri: this.props.leftUrl }} resizeMode="cover" />
        <View style={{ flex: 1, paddingHorizontal: 7 }}>
          <Text style={styles.title} numberOfLines={0}>
            <Text style={{ fontWeight: "700" }} onPress={this.userNamePressed.bind(this)}>
              {"@hov"}
            </Text>
            <Text>{" and others liked your image"}</Text>
            <Text style={{ fontSize: 9, color: "blue" }}>{" 1 minute ago"}</Text>
          </Text>
          <View style={[styles.imagesContainer]}>
            {this.props.photos.map((url, idx) => (
              <View key={url} style={[{ zIndex: 10 - idx }, styles.smallImagePapa]}>
                <Image style={styles.smallImage} source={{ uri: url }} resizeMode="cover" />
              </View>
            ))}
          </View>
        </View>

        <Image style={styles.rightImage} source={{ uri: this.props.rightUrl }} resizeMode="cover" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 5,
    backgroundColor: "lightgrey",
    width: Dimensions.get("window").width
  },
  leftImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  rightImage: {
    width: 50,
    height: 50,
    borderRadius: 7
  },
  smallImage: {
    width: 30,
    height: 30,
    borderRadius: 15
    // backgroundColor: "lightgrey"
  },
  smallImagePapa: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    // borderWidth: 1.5,
    // borderColor: "white",
    marginRight: -6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  imagesContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    flex: 1,
    fontSize: 14
  }
});

export default MultiLike;
