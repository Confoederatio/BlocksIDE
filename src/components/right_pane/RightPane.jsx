import React, { Component } from 'react';
import CodeEditor from "./CodeEditor.jsx"
import { parseCode } from '../../lib/js2blocks.js';

class RightPane extends Component {
  componentDidMount() {
    //console.log("RightPane")
  }
  render() {
    return (
      <div className = {`right-pane ${this.props.view_mode}`}>
        <CodeEditor/>
      </div>
    );
  }
}

export default RightPane;
