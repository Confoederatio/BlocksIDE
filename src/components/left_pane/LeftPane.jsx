// In LeftPane.jsx

import React, { Component } from 'react';
import Header from "./Header.jsx";
import Blockly from './Blockly.jsx';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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

  render() {
    // Define a style for the hidden panel
    const hiddenTabPanelStyle = {
      display: 'none'
    };

    // We will apply this style conditionally
    const blocklyPanelStyle = this.state.selectedIndex === 0 ? {} : hiddenTabPanelStyle;
    const debuggerPanelStyle = this.state.selectedIndex === 1 ? {} : hiddenTabPanelStyle;


    return (
      <div>
        <Header />
        {/* Control the selected tab index directly from our state */}
        <Tabs selectedIndex={this.state.selectedIndex} onSelect={this.handleTabSelect}>
          <TabList>
            <Tab>Block Editor</Tab>
            <Tab>Debugger</Tab>
          </TabList>

          {/*
            KEY CHANGE: We no longer use TabPanel from the library.
            We use simple <div>s and control their visibility ourselves.
            This prevents the library from unmounting anything.
          */}
          <div style={blocklyPanelStyle}>
            <Blockly />
          </div>

          <div style={debuggerPanelStyle}>
            <div>
              <span>Debugger: </span><button onClick={window.debugger.clear}>Clear</button>
            </div>
            <div id='debugger' ref={ref => this.debugger = ref} />
          </div>

        </Tabs>
      </div>
    );
  }
}

export default LeftPane;