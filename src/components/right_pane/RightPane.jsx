// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import CodeEditor from "./CodeEditor.jsx"
import { parseCode } from '../../lib/js2blocks.js';

class RightPane extends Component {
  componentDidMount() {
    //console.log("RightPane")
  }
  copyEd2_Ed1(){
    //console.log("copyEd2_Ed1")
   
   window._BIDE.code = window._BIDE.blockly_code;
    window._BIDE.JSWriteEditor.setValue(window._BIDE.code);
 
    parseCode(window._BIDE.code)
    window._BIDE.code_prev = window._BIDE.code;
  }
  bi_pane1_clear(){
    var debugger_el = document.querySelector(`#debugger`);

    while (debugger_el.firstChild) {
      debugger_el.removeChild(debugger_el.firstChild);
    }
  }
  bi_run(){
    //console.log("bi_run")
    try{
      //bi_debugger_clear();
      window.debugger.clear()
      this.bi_pane1_clear();
      
      // JCOA: Is there a safe eval with debug options?
      // eslint-disable-next-line
      eval(window._BIDE.blockly_code)      
    }
    catch(err){
      //bi_debugger.value += err;
      console.log(err)
    }
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.copyEd2_Ed1}>SYNC: JS Editor &lt;- JS Generated</button>
          <button onClick={this.bi_run.bind(this)}>RUN: JS Generated</button>
        </div>
        <CodeEditor />
      </div>
    );
  }
}

export default RightPane;
