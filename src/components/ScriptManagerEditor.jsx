// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import Header from './left_pane/Header.jsx'
import LeftPane from "./left_pane/LeftPane";
import RightPane from "./right_pane/RightPane";
import SplitPane from "react-split-pane";

class ScriptManagerEditor extends Component {
  constructor (arg0_options) {
    super(arg0_options);

    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    this.state = {
      view_mode: "split" //Either 'split'/'unified'. 'unified' by default.
    };

    //Bizarre fix needed for unified to force reflow for CodeMirror gutters to work.
    //LeftPane reflow
    if (this.state.view_mode == "unified") {
      this.toggleSplitScreen();
      this.initialise_unified_screen_count = 0;
      this.initialise_unified_screen_loop = setInterval(() => {
        var clear_interval = false;
        this.initialise_unified_screen_count++;

        if (this.state.view_mode == "split") {
          clear_interval = true;
          this.toggleSplitScreen();
        }
        if (this.initialise_unified_screen_count > 100) {
          clear_interval = true;
          console.error(`toggleSplitScreen() initialisation failed.`);
        }
        if (clear_interval) {
          clearInterval(this.initialise_unified_screen_loop);
          delete this.initialise_unified_screen_count;
        }
      }, 0);
    }
  }

  resize = () => {
    try {
      window._BIDE.resize.resize();
    } catch (err) {
      console.log(err);
    }
  }

  toggleSplitScreen = () => {
    this.state.view_mode = (this.state.view_mode == "split") ? "unified": "split";
    this.setState(() => {
      this.resize();

      //Return statement
      return { view_mode: this.state.view_mode };
    });
  }

  render() {
    var view_props = {
      view_mode: this.state.view_mode,
      toggleSplitScreen: this.toggleSplitScreen
    };

    return (
      <div>
        <SplitPane
          onChange={this.resize}
          split="vertical"
          defaultSize={'50dvw'}
          minSize = {250}
          maxSize = {-16}
        >
          <LeftPane {...view_props}></LeftPane>
          <RightPane {...view_props}></RightPane>
        </SplitPane>
      </div>
    );
  }
}

export default ScriptManagerEditor;
