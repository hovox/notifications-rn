// @flow

import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";

import SinglePhoto from "./SinglePhoto";
import MutliPhotoScrollable from "./MultiPhotoScrollable";
import MultiLike from "./MultiLike";

type Prop = {};
class NotificationList extends Component<Prop> {
  data: any;
  constructor(props: Prop) {
    super(props);
    this.data = require("./generated.json");
  }
  _keyExtractor = (item, index) => index + "";
  _renderItem = ({ item }) => {
    if (item.type === "singlePhoto") {
      return <SinglePhoto title={item.title} leftUrl={item.leftUrl} rightUrl={item.rightUrl} />;
    }
    if (item.type === "multiPhotoLike") {
      return (
        <MutliPhotoScrollable
          leftUrl={item.leftUrl}
          rightUrl={item.rightUrl}
          title="@hov liked an images"
          photos={item.photos}
        />
      );
    }
    if (item.type === "multiLike") {
      return (
        <MultiLike leftUrl={item.leftUrl} rightUrl={item.rightUrl} title="@hov liked an images" photos={item.photos} />
      );
    }
  };
  _separator = ({ highlighted }) => <View style={styles.separator} />;
  // _itemLayout = (data: any, index: any) => {
  //   return { length: 150, offset: 150 * index + 1 * index, index };
  // };

  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        {/* <MutliPhotoScrollable
          leftUrl="http://cdn105.picsart.com/203597176000202.jpg?r240x240"
          title="@hov liked an images"
          photos={[
            "http://cdn109.picsart.com/203540621000202.jpg?r240x240",
            "https://cdn141.picsart.com/241440251028202.jpg?r240x240",
            "http://cdn125.picsart.com/212356479005202.jpg?r240x240",
            "http://cdn109.picsart.com/203540621000202.jpg?r240x240",
            "https://cdn141.picsart.com/241440251028202.jpg?r240x240",
            "http://cdn125.picsart.com/212356479005202.jpg?r240x240",
            "http://cdn109.picsart.com/203540621000202.jpg?r240x240",
            "https://cdn141.picsart.com/241440251028202.jpg?r240x240",
            "http://cdn125.picsart.com/212356479005202.jpg?r240x240",
            "http://cdn109.picsart.com/203540621000202.jpg?r240x240",
            "https://cdn141.picsart.com/241440251028202.jpg?r240x240",
            "http://cdn125.picsart.com/212356479005202.jpg?r240x240"
          ]}
        /> */}
        {/* <SinglePhoto
          title="@hov liked an image"
          leftUrl="http://cdn105.picsart.com/203597176000202.jpg?r240x240"
          rightUrl="http://cdn105.picsart.com/203597176000202.jpg?r240x240"
        /> */}
        <FlatList
          style={{ width: width }}
          data={this.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._separator}
          removeClippedSubviews={true}
          // initialNumToRender={5}
          // maxToRenderPerBatch={100}
          // getItemLayout={this._itemLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 64
  },
  separator: {
    backgroundColor: "green",
    height: 1,
    marginLeft: 40,
    opacity: 0.3
  }
});

export default NotificationList;
