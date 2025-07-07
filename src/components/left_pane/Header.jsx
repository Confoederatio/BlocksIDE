// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react'
import { saveAs } from 'file-saver'
import { parseCode } from '../../lib/js2blocks.js'
import { version } from '../../version.json'

class Header extends Component {
  //  constructor() {
  //    super()
  //    console.log(version)
  //    this.version = version
  //  }
  //  componentWillMount(){    
  //  }
  save() {
    console.log("Save JS Editor")
    var blob = new Blob([window._BIDE.code], {
        type : 'text/plain'
      });
    console.log(saveAs)
    saveAs(blob, 'script1.js');
  }
  saveGen() {
    console.log("Save Generated JS")
    var blob = new Blob([window._BIDE.blockly_code], {
        type : 'text/plain'
      });
    console.log(saveAs)
    saveAs(blob, 'script1.js');
  }
  open() {
    var openFile = document.getElementById('open-js-file');
    openFile.click()
    //this.openFileInput.click()
  }
  openjs(event) {
    var input = event.target;
    console.log("open "+input.files[0]);
    var reader = new FileReader();
    reader.onload = function(){
      window._BIDE.code = reader.result
      window._BIDE.JSWriteEditor.setValue(reader.result);
      
      parseCode(reader.result)
      window._BIDE.code_prev = window._BIDE.code
    }
    reader.readAsText(input.files[0]);
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
  componentDidMount() {
    var openFile = document.getElementById('open-js-file');
    openFile.addEventListener('change', this.openjs, false);
    //this.openFileInput.addEventListener('change', this.openjs, false);
  }
  render() {
    return (
      <div id = "topbar">
        <input id="open-js-file" type="file" name="openjsfile" accept='.js' style={{display: "none"}} ref={ref => this.openFileInput = ref} />
        <button onClick={this.open}>Open</button>
        <button onClick={this.saveGen}>Save JS Generated</button>
        <button onClick={this.save}>Save JS Editor</button>
        <button onClick = {this.props.toggleSplitScreen} style = {{marginLeft: "8px"}}>Toggle Split-Screen</button>
        <button onClick={this.copyEd2_Ed1} style = {{marginLeft: "8px"}}>SYNC: JS Editor &lt;- JS Generated</button>
        <button onClick={this.bi_run.bind(this)}>RUN: JS Generated</button>
      </div>
    );
  }
}

export default Header;
