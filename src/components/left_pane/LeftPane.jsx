// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import Header from "./Header.jsx";
import SplitPane from "react-split-pane";
import Blockly from './Blockly.jsx';

class LeftPane extends Component {
  resize() {
    //console.log("Split resize")
    try{
      window._BIDE.resize.resize()
    } catch(err) {
      console.log(err)
    }
  }
  componentDidMount() {
    window._BIDE.debugger = this.debugger
  }
  render() {
    return (
      <SplitPane onChange = {this.resize} split = "horizontal" defaultSize = {'50dvh'}>
        <div>
          <Header/>
          <Blockly/>
        </div>
        <div>
          <div>
            <div>Debugger:</div>
            <button onClick = {window.debugger.clear}>Clear</button>
          </div>
          <div id='debugger' ref={ref => this.debugger = ref} />
        </div>
      </SplitPane>
    );
  }
}

export default LeftPane;
