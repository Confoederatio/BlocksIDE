import React, { Component } from 'react';
import './css/layout.css';
import 'react-tabs/style/react-tabs.css';
import ScriptManagerEditor from './components/ScriptManagerEditor.jsx';
import Blockly from './blockly';
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class App extends Component {
  componentWillMount(){
    // Global scope
    window.Blockly = Blockly
    window.Snap = Snap

    window.main = {
      //Component Arrays
      JSReadEditors: [],
      JSWriteEditors: [],

      //Variables (Transpiler)
      b2c_error: false,

      //Variables (UI)
      blockly_code: "",
      code: `var i = 10;`,
      code_prev: "",

      //KEEP AT BOTTOM! - Functions/Logic

      resize: {
        callbackList: [],
        addCallback: function(callback){
          window.main.resize.callbackList.push(callback)
        },
        resize: function () {
          // console.log("Resize")
          window.main.resize.callbackList.forEach(function(cb) {
            cb()
          })

          //Refresh CodeMirror editors
          console.log(`Refreshing CodeMirror editors`);
          if (window.main.init_finished) {
            try {
              window.main.JSReadEditor.refresh();
            } catch (e) { console.warn(e); }
            try {
              window.main.JSWriteEditor.refresh();
            } catch (e) { console.warn(e); }

            try {
              if (!document.activeElement.parentElement.parentElement.getAttribute("class").includes("CodeMirror"))
                window.main.JSReadEditor.setValue(window.main.code);
            } catch (e) {}
            try {
              if (!document.activeElement.parentElement.parentElement.getAttribute("class").includes("CodeMirror"))
                for (let i = window.main.JSWriteEditors.length - 1; i >= 0; i--) {
                  let local_editor = window.main.JSWriteEditors[i];

                  //Internal guard clause; make sure local_editor.editor actually exists
                  if (!local_editor.editor) {
                    window.main.JSWriteEditors.splice(i, 1);
                    continue;
                  }
                  local_editor.editor.codeMirror.setValue(window.main.code);
                }
            } catch (e) {}
          }
        }
      },
      updateWorkspace: function () {
        let Blockly = window.Blockly
        console.log("updateWorkspace");
        let blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
        window.main.blockly_code = blockly_code;
        try{
          window.main.JSReadEditor.setValue(blockly_code)
        }
        catch(e){
          // JSReadEditor not opened yet.
        }
      }
    }
    
    window.debugger = {
      log: function(msg){
        if(window.main.debugger){
          window.main.debugger.innerHTML += msg + '<br>' // value += msg + '\n'
        }
      },
      clear: function(){
        if(window.main.debugger){
          window.main.debugger.innerHTML = '' // value = ''
        }
      }
    }

    window.main.init_finished = true;
  }
  componentDidMount() {
    window.addEventListener('resize', window.main.resize.resize, false)
    window.main.resize.resize()
    //Blockly.svgResize(Blockly.workspace);
  }
  render() {
    return (
      <ScriptManagerEditor/>
    );
  }
}

export default App;
