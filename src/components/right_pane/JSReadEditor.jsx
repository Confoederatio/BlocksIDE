import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';

class JSReadEditor extends Component {
  constructor () {
    super();
    this.state = {
      code: window.main.blockly_code,
    };
  }
  componentDidMount () {
    window.main.JSReadEditor = this.editor.codeMirror;
  }
  render () {
    var options = {
      lineNumbers: true,
      mode: "javascript",
      readOnly: true
    };

    //Return statement
    return (
      <div className = "js-read-editor" style = {{
        height: "calc(100vh - 22px)",
        width: "100%",
        display: "flex",
        padding: "0px"
      }}>
        <CodeMirror ref = {ref => this.editor = ref} value={this.state.code}
        options={options}/>
      </div>
    );
  }

  updateCode (arg0_new_code) {
    //Convert from parameters
    var new_code = arg0_new_code;

    this.state.code = new_code;
  }
}

export default JSReadEditor;