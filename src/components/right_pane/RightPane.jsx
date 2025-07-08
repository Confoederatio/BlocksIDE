// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import CodeEditor from "./CodeEditor.jsx"
import { parseCode } from '../../libraries/js2blocks.js';

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
