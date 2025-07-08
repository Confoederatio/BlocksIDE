import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import JSWriteEditor from './JSWriteEditor.jsx'
import JSReadEditor from './JSReadEditor.jsx'

class CodeEditor extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
  }
  
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
    this.state.tabIndex = index;
    this.resize();
  }
  resize() {
    try {
      window.main.resize.resize();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Tabs onSelect = {this.handleSelect.bind(this)}>
        <TabList>
          <Tab>JS Editor</Tab>
          <Tab>JS Generated (Read-only)</Tab>
        </TabList>

        <TabPanel>
          <JSWriteEditor/>
        </TabPanel>
        <TabPanel>
          <JSReadEditor/>
        </TabPanel>
      </Tabs>
    );
  }
}

export default CodeEditor;