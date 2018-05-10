// @flow

import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";

import SinglePhoto from "./SinglePhoto";
import MutliPhotoScrollable from "./MultiPhotoScrollable";
import MultiLike from "./MultiLike";

import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

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

    this._layoutProvider = new LayoutProvider(
      index => {
        return 1;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = 150;
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
  }

  render() {
    return (
      <RecyclerListView
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        forceNonDeterministicRendering={true}
      />
    );
  }
}

export default Recycler;
