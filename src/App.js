import React, { Component } from 'react';
import './css/layout.css';
import './css/editor_themes/vanilla_codemirror_themes.css';
import 'react-tabs/style/react-tabs.css';
import ScriptManagerEditor from './components/ScriptManagerEditor.jsx';
import Blockly from './blockly';
import {saveAs} from "file-saver";
import {parseCode} from "./lib/js2blocks";
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

class App extends Component {
  //componentWillMount() - Runs on App initialisation
  componentWillMount () {
    //Initialise global variables
    window.Blockly = Blockly;
    window.Snap = Snap;

    //Initialise window.main, i.e. global state
    window.main = {
      //Component Arrays
      JSReadEditors: [],
      JSWriteEditors: [],

      //Variables (Transpiler)
      b2c_error: false, //b2c: Blocks to Code

      //Variables (UI)
      blockly_code: "",
      code: `var i = 10;`,
      code_prev: "",

      //KEEP AT BOTTOM! - Functions/Logic

      resize: {
        callback_list: [],

        addCallback: function (arg0_callback) {
          //Convert from parameters
          var callback = arg0_callback;

          //Push callback to callback_list
          window.main.resize.callback_list.push(callback);
        },
        resize: function () {
          //Iterate over each callback in the current callback_list
          window.main.resize.callback_list.forEach(function (local_callback) {
            local_callback();
          });

          //Refresh CodeMirror editors
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
        //Declare local instance varaibles
        var Blockly = window.Blockly;
        var blockly_code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);

        //Update Blockly code
        window.main.blockly_code = blockly_code;
        try {
          window.main.JSReadEditor.setValue(blockly_code);
        } catch (e) {}
      }
    }

    initialiseBindings();
    initialiseDebugger();

    window.main.init_finished = true;
  }

  componentDidMount() {
    window.addEventListener('resize', window.main.resize.resize, false);
    window.main.resize.resize();
  }

  render() {
    //Return statement
    return (
      <ScriptManagerEditor/>
    );
  }
}

//Initialise binding functions
function initialiseBindings () {
  //Initialise functions
  window.isSplitScreen = function () {
    //Return statement
    return window.main.ScriptManagerEditor.state.view_mode;
  };

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

    //Return statement
    return window.main.code;
  };

  window.runJS = function () {
    try {
      window.debugger.clear();
      return eval(window.main.blockly_code);
    } catch (e) {
      console.error(e);
    }
  };

  window.saveGeneratedJS = function () {
    console.log("Save Generated JS")
    var blob = new Blob([window.main.blockly_code], {
      type : 'text/plain'
    });
    console.log(saveAs)
    saveAs(blob, 'script1.js');

    //Return statement
    return window.main.blockly_code;
  };

  window.saveJS = function () {
    console.log("Save JS Editor")
    var blob = new Blob([window.main.code], {
      type : 'text/plain'
    });
    console.log(saveAs)
    saveAs(blob, 'script1.js');

    //Return statement
    return window.main.code;
  };

  window.setTheme = function (arg0_theme) {
    //Convert from parameters
    var theme = arg0_theme;

    //Set editor themes
    window.main.theme = theme;

    try {
      window.main.JSReadEditors[0].setTheme(theme);
    } catch (e) {}
    try {
      window.main.JSWriteEditors[0].setTheme(theme);
    } catch (e) {}
  };

  window.synchroniseEditors = function () {
    window.main.code = window.main.blockly_code;
    window.main.JSWriteEditor.setValue(window.main.code);

    parseCode(window.main.code)
    window.main.code_prev = window.main.code;
  };

  window.toggleSplitScreen = function () {
    window.main.ScriptManagerEditor.toggleSplitScreen();
  };
}

function initialiseDebugger () {
  //Initialise functions
  window.debugger = {
    clear: function () {
      //Declare local instance variables
      var debugger_el = document.querySelector(`#debugger`);

      //Recursively clear children
      while (debugger_el.firstChild)
        debugger_el.removeChild(debugger_el.firstChild);
    },
    log: function (arg0_string){
      //Convert from parameters
      var string = arg0_string;

      //Append string to window.main.debugger.innerHTML
      if (window.main.debugger)
        window.main.debugger.innerHTML += `<span>${string}<br></span>`;
    }
  };
}

export default App;
