// @flow

import React, { Component } from "react";
import { View, Text, Dimensions, Image } from "react-native";

import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const screenW = Dimensions.get("window").width;

class Recycler extends Component<any, any> {
  _layoutProvider: LayoutProvider;
  data: any;
  constructor(props: any) {
    super(props);
    this.data = require("./generated.json");

    let { width } = Dimensions.get("window");

    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    const data = this.data;
    this._layoutProvider = new LayoutProvider(
      index => {
        return 1;
      },
      (type, dim, index) => {
        dim.width = screenW / 2;
        dim.height = data[index].ratio * dim.width;
      }
    );

    // $FlowFixMe
    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this._generateArray())
    };
  }

  _generateArray() {
    return this.data;
  }

  //Given type and data return the view component
  _rowRenderer(type, item) {
    //You can return any view here, CellContainer has no special significance
    const w = screenW / 2;
    return Cell(item.url, w, item.ratio * w);
  }

  render() {
    return (
      <RecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        style={{ backgroundColor: "grey" }}
        // forceNonDeterministicRendering={true}
      />
    );
  }
}

function Cell(url: string, w: number, h: number) {
  return <Image style={{ width: w, height: h, backgroundColor: "blue" }} resizeMode="cover" source={{ uri: url }} />;
}

export default Recycler;
