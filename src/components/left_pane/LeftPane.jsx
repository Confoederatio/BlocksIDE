// In LeftPane.jsx

import React, { Component } from 'react';
import Header from "./Header.jsx";
import Blockly from './Blockly.jsx';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import JSWriteEditor from "../right_pane/JSWriteEditor";
import JSReadEditor from "../right_pane/JSReadEditor";

class LeftPane extends Component {
  constructor() {
    super();
    this.state = {
      // We only need one piece of state: the currently selected tab index.
      selectedIndex: 0
    };
  }

  // This is the only event handler we need.
  // It updates our state when a tab is clicked.
  handleTabSelect = (index) => {
    this.setState({ selectedIndex: index }, () => {
      document.querySelector(`.blocklyToolboxDiv`).style.display = (this.state.selectedIndex != 0) ?
        "none" : "block";

      //Call resize to redraw
      setTimeout(() => {
        this.resize();
        window.Blockly.mainWorkspace.render(); //Re-render Blockly
      }, 0);
    });
  }

  resize() {
    try {
      window._BIDE.resize.resize();
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    window._BIDE.debugger = this.debugger;
  }

  componentDidUpdate (prevProps) {
    if (prevProps.view_mode !== this.props.view_mode)
      setTimeout(() => this.resize(), 0);
    if (this.props.view_mode != "unified" && this.state.selectedIndex >= 2)
      this.handleTabSelect(0);
  }

  render() {
    // Define a style for the hidden panel
    const hiddenTabPanelStyle = {
      display: 'none'
    };

    // We will apply this style conditionally
    const tab_one_style = this.state.selectedIndex === 0 ? {} : hiddenTabPanelStyle;
    const tab_two_style = this.state.selectedIndex === 1 ? {} : hiddenTabPanelStyle;
    const tab_three_style = this.state.selectedIndex === 2 ? {} : hiddenTabPanelStyle;
    const tab_four_style = this.state.selectedIndex === 3 ? {} : hiddenTabPanelStyle;

    return (
      <div className = {`left-pane ${this.props.view_mode} data-selected-${this.state.selectedIndex}`}>
        {/* Control the selected tab index directly from our state */}
        <Tabs selectedIndex={this.state.selectedIndex} onSelect={this.handleTabSelect}>
          <TabList>
            <Tab>Block Editor</Tab>
            <Tab>Debugger</Tab>
            {(this.props.view_mode == "unified") && <Tab>JS Editor</Tab>}
            {(this.props.view_mode == "unified") && <Tab>JS Generated (Read-only)</Tab>}
          </TabList>

          <div style = {tab_one_style}>
            <Blockly/>
          </div>
          <div style = {tab_two_style}>
            <div>
              <span>Debugger: </span><button onClick={window.debugger.clear}>Clear</button>
            </div>
            <div id = "debugger" ref = {(ref) => this.debugger = ref} />
          </div>
          {(this.props.view_mode == "unified") && <div style = {tab_three_style}><JSWriteEditor/></div>}
          {(this.props.view_mode == "unified") && <div style = {tab_four_style}><JSReadEditor/></div>}
        </Tabs>
      </div>
    );
  }
}

export default LeftPane;