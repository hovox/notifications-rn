// @flow

import React, { Component, PureComponent } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import MasonryList from "@appandflow/masonry-list";

const data: Array<{ type: string, url: string, ratio: number }> = require("./generated.json");
const screenW = Dimensions.get("window").width - 5;
const colCount = 2;
const cellW = screenW / colCount;

type CellProps = { w: number, h: number, url: string };
class Cell extends PureComponent<CellProps> {
  componentDidMount() {
    // console.warn('mount cell');
  }

  componentWillUnmount() {
    // console.warn('unmount cell');
  }

  render() {
    const { w, h, url } = this.props;
    return (
      <View style={{ flex: 1, width: w, height: h, paddingBottom: 5, paddingLeft: 5 }}>
        <Image
          style={{ flex: 1, borderRadius: 5, backgroundColor: "lightgrey" }}
          resizeMode="cover"
          source={{ uri: url }}
        />
      </View>
    );
  }
}
type State = { loadingPage: boolean, data: Array<any> };
class MasonaryLayout extends Component<any, State> {
  timeoutObj: any;
  constructor(props: any) {
    super(props);
    this.state = { loadingPage: true, data: [] };
    this.loadNewPage(true);
  }

  loadNewPage(forceLoad?: boolean) {
    if (forceLoad || !this.timeoutObj) {
      this.setState({ loadingPage: true });
      console.warn("lading");
      this.timeoutObj = setTimeout(() => {
        this.timeoutObj = null;
        this.setState({ loadingPage: false, data: data.slice(0, this.state.data.length + 60) });
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutObj);
  }

  render() {
    return (
      <MasonryList
        style={{ width: screenW }}
        data={this.state.data}
        renderItem={({ item }) => <Cell url={item.url} w={cellW} h={cellW * item.ratio} />}
        getHeightForItem={({ item }) => cellW * item.ratio}
        numColumns={2}
        keyExtractor={item => item.url}
        onEndReached={() => this.loadNewPage()}
        onEndReachedThreshold={5}
      />
    );
  }
}

export default MasonaryLayout;
