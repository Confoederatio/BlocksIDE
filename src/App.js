import React, { Component } from 'react';
import './css/layout.css';
import 'react-tabs/style/react-tabs.css';
import ScriptManagerEditor from './components/ScriptManagerEditor.jsx';
import Blockly from './blockly';
import {saveAs} from "file-saver";
import {parseCode} from "./lib/js2blocks";
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class App extends Component {
  componentWillMount(){
    // Global scope
    window.Blockly = Blockly
    window.Snap = Snap

    window.debugger = {
      log: function(msg){
        if(window.main.debugger){
          window.main.debugger.innerHTML += msg + '<br>' // value += msg + '\n'
        }
      },
      clear: function(){
        var debugger_el = document.querySelector(`#debugger`);

        while (debugger_el.firstChild)
          debugger_el.removeChild(debugger_el.firstChild);
      }
    };
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
    initialiseBindings();

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

//Initialise binding functions
function initialiseBindings () {
  window.openJS = function (event) {
    var input = event.target;
    console.log("open "+input.files[0]);
    var reader = new FileReader();
    reader.onload = function(){
      window.main.code = reader.result
      window.main.JSWriteEditor.setValue(reader.result);

      parseCode(reader.result)
      window.main.code_prev = window.main.code
    }
    reader.readAsText(input.files[0]);
  };

  window.runJS = function () {
    try{
      //bi_debugger_clear();
      window.debugger.clear();

      // JCOA: Is there a safe eval with debug options?
      // eslint-disable-next-line
      eval(window.main.blockly_code)
    }
    catch(err){
      //bi_debugger.value += err;
      console.log(err)
    }
  };

  window.saveGeneratedJS = function () {
    console.log("Save Generated JS")
    var blob = new Blob([window.main.blockly_code], {
      type : 'text/plain'
    });
    console.log(saveAs)
    saveAs(blob, 'script1.js');
  };

  window.saveJS = function () {
    console.log("Save JS Editor")
    var blob = new Blob([window.main.code], {
      type : 'text/plain'
    });
    console.log(saveAs)
    saveAs(blob, 'script1.js');
  };

  window.synchroniseEditors = function () {
    //console.log("copyEd2_Ed1")

    window.main.code = window.main.blockly_code;
    window.main.JSWriteEditor.setValue(window.main.code);

    parseCode(window.main.code)
    window.main.code_prev = window.main.code;
  };
}

export default App;
