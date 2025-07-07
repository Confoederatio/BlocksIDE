// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
import './css/layout.css';
import 'react-tabs/style/react-tabs.css';
import ScriptManagerEditor from './components/ScriptManagerEditor.jsx';
import Blockly from './blockly';
//import Snap from 'snapsvg';
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class App extends Component {
  componentWillMount(){
    // Global scope
    window.Blockly = Blockly
    window.Snap = Snap

    window._BIDE = {
      JSReadEditors: [],
      JSWriteEditors: []
    }
    let _BIDE = window._BIDE
    _BIDE.b2c_error = false
    _BIDE.code = 'var i=10'
    
    _BIDE.resize = {}
    _BIDE.resize.callbackList = []
    _BIDE.resize.addCallback = function(callback){
        _BIDE.resize.callbackList.push(callback)  
      }
    _BIDE.resize.resize = function(){
      // console.log("Resize")
      _BIDE.resize.callbackList.forEach(function(cb) {
        cb()
      })

      //Refresh CodeMirror editors
      console.log(`Refreshing CodeMirror editors`);
      if (_BIDE.init_finished) {
        try {
          window._BIDE.JSReadEditor.refresh();
        } catch (e) { console.warn(e); }
        try {
          window._BIDE.JSWriteEditor.refresh();
        } catch (e) { console.warn(e); }

        try {
          if (!document.activeElement.parentElement.parentElement.getAttribute("class").includes("CodeMirror"))
            window._BIDE.JSReadEditor.setValue(window._BIDE.code);
        } catch (e) {}
        try {
          if (!document.activeElement.parentElement.parentElement.getAttribute("class").includes("CodeMirror"))
            for (let i = window._BIDE.JSWriteEditors.length - 1; i >= 0; i--) {
              let local_editor = window._BIDE.JSWriteEditors[i];

              //Internal guard clause; make sure local_editor.editor actually exists
              if (!local_editor.editor) {
                window._BIDE.JSWriteEditors.splice(i, 1);
                continue;
              }
              local_editor.editor.codeMirror.setValue(window._BIDE.code);
            }
        } catch (e) {}
      }
    }
    _BIDE.blockly_code = ""
    _BIDE.code_prev = ""
    
    window.debugger = {
      log: function(msg){
        if(_BIDE.debugger){
          _BIDE.debugger.innerHTML += msg + '<br>' // value += msg + '\n'
        }
      },
      clear: function(){
        if(_BIDE.debugger){
          _BIDE.debugger.innerHTML = '' // value = ''
        }
      }
    }
    window._BIDE.updateWorkspace = function(e){
      let Blockly = window.Blockly
      console.log("updateWorkspace");
      let blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
      window._BIDE.blockly_code = blockly_code;
      try{
        window._BIDE.JSReadEditor.setValue(blockly_code)
      }
      catch(e){
        // JSReadEditor not opened yet.
      }
    }

    _BIDE.init_finished = true;
  }
  componentDidMount() {
    window.addEventListener('resize', window._BIDE.resize.resize, false)
    window._BIDE.resize.resize()
    //Blockly.svgResize(Blockly.workspace);
  }
  render() {
    return (
      <ScriptManagerEditor/>
    );
  }
}

export default App;
