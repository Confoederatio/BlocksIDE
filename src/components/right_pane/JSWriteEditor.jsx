import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';

import { parseCode } from '../../lib/js2blocks.js';

class JSWriteEditor extends Component {
  constructor() {
    super();

    //Declare local instance variables
    this.state = {
      code: window.main.code,
      theme: "tomorrow-night-bright"
    };
  }

  componentDidMount() {
    var has_instance = false;
    window.main.JSWriteEditor = this.editor.codeMirror;
    window.main.JSWriteEditorInstance = this;
    window.main.JSWriteEditors.push(this);

    // Check if old code == newCOde do not execute. Save old code
    if(window.main.code_prev !== this.state.code){
      parseCode(this.state.code)
      window.main.code_prev = window.main.code;
    }
    console.log(`JSWriteEditor: componentDidMount()`);
  }

  render() {
    var options = {
      lineNumbers: true,
      mode: "javascript",
      theme: this.state.theme
    };

    return (
      <div className = "js-write-editor" style = {{
        height: "calc(100vh)",
        width: "100%",
        display: "flex",
        padding: "0px"
      }}>
        <CodeMirror ref={ref => this.editor = ref} value = {window.main.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }

  setTheme (arg0_theme) {
    //Convert from parameters
    var theme = arg0_theme;

    //Set state
    this.setState({ theme: theme });
  }

  updateCode(newCode) {
    this.state.code = newCode;
    window.main.code = newCode

    parseCode(newCode)
    window.main.code_prev = window.main.code;
    console.log(`JSWriteEditor: updateCode()`);
  }
}

export default JSWriteEditor;