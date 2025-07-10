import React, { Component } from 'react';
import Header from './left_pane/Header.jsx'
import LeftPane from "./left_pane/LeftPane";
import RightPane from "./right_pane/RightPane";
import SplitPane from "react-split-pane";

class ScriptManagerEditor extends Component {
  constructor (arg0_options) {
    //Convert from parameters
    super(arg0_options);
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    this.state = {
      view_mode: "split" //Either 'split'/'unified'. 'unified' by default.
    };

    //Bizarre fix needed for unified to force reflow for CodeMirror gutters to work.
    {
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

    //Set window.main.ScriptManagerEditor
    window.main.ScriptManagerEditor = this;
  }

  render() {
    //Declare local instance variables
    var view_props = {
      view_mode: this.state.view_mode,
      toggleSplitScreen: this.toggleSplitScreen,
    };

    //Return statement
    return (
      <div
        className="script-manager-editor"
        style={{
          height: "100%", // Full viewport height
          display: "flex",
          flexDirection: "column", // Stack Header and SplitPane vertically
          overflow: "hidden"
        }}
      >
        <Header toggleSplitScreen = {this.toggleSplitScreen} />
        <div style={{
          overflow: "hidden"
        }}>
          <SplitPane
            onChange = {this.resize}
            split = "vertical"
            defaultSize = "50%" //Default to 50% width for the left pane
            minSize = {250} //Minimum size for the left pane
            maxSize = {-16} //This might need adjustment (see explanation below)
          >
            <LeftPane style={{ height: "100%", overflow: "hidden"}} {...view_props} />
            <RightPane style={{ height: "100%", overflow: "hidden"}} {...view_props} />
          </SplitPane>
        </div>
      </div>
    );
  }

  resize = () => {
    try {
      window.main.resize.resize();
    } catch (err) {
      console.log(err);
    }
  }

  toggleSplitScreen = () => {
    this.state.view_mode = (this.state.view_mode == "split") ? "unified": "split";
    this.setState(this.state, () => {
      this.resize();
    });
  }
}

export default ScriptManagerEditor;
