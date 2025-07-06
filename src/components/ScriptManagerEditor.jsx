// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import Header from './left_pane/Header.jsx'
import LeftPane from "./left_pane/LeftPane";
import RightPane from "./right_pane/RightPane";
import SplitPane from "react-split-pane";

class ScriptManagerEditor extends Component {
  render() {
    return (
      <div>
        <SplitPane
          onChange={this.resize}
          split="vertical"
          defaultSize={'50dvw'}
          minSize = {250}
          maxSize = {-16}
        >
          <LeftPane/>
          <RightPane/>
        </SplitPane>
      </div>
    );
  }
}

export default ScriptManagerEditor;
