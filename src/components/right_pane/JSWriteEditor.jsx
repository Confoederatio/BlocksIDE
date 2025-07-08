import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';

import { parseCode } from '../../lib/js2blocks.js';

class JSWriteEditor extends Component {
  constructor() {
    super();
    //app_this = this;
    this.state = {
      code: window.main.code
    };
  }
  updateCode(newCode) {
    this.state.code = newCode;
    window.main.code = newCode

    parseCode(newCode)
    window.main.code_prev = window.main.code;
    console.log(`JSWriteEditor: updateCode()`);
  }
  componentDidMount() {
    var has_instance = false;
    window.main.JSWriteEditor = this.editor.codeMirror;
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
      mode: "javascript"
    };

    return (
      <div className = "js-write-editor" style = {{
        height: "calc(100vh - 22px)",
        width: "100%",
        display: "flex",
        padding: "0px"
      }}>
        <CodeMirror ref={ref => this.editor = ref} value = {window.main.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }
}

export default JSWriteEditor;