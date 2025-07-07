import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';
//import { walk } from 'acorn/dist/walk.js';

import { parseCode } from '../../lib/js2blocks.js';

//var CodeMirror = require('react-codemirror');
//require('codemirror/lib/codemirror.css');
//require('codemirror/mode/javascript/javascript');

//var app_this
class JSWriteEditor extends Component {
  constructor() {
    super();
    //app_this = this;
    this.state = {
      code: window._BIDE.code
    };
  }
  updateCode(newCode) {
    this.setState({
        code: newCode,
    });
    window._BIDE.code = newCode

    parseCode(newCode)
    window._BIDE.code_prev = window._BIDE.code;
    console.log(`JSWriteEditor: updateCode()`);
  }
  componentDidMount() {
    var has_instance = false;

    //console.log(walk)
    //console.log(walk.recursive)
    window._BIDE.JSWriteEditor = this.editor.codeMirror;
    window._BIDE.JSWriteEditors.push(this);

    // Check if old code == newCOde do not execute. Save old code
    if(window._BIDE.code_prev !== this.state.code){
      parseCode(this.state.code)
      window._BIDE.code_prev = window._BIDE.code;
    }
    console.log(`JSWriteEditor: componentDidMount()`);
  }
  render() {
    var style1 = {
      height: `100dvh`,
      //"min-height": "100vh",
      width: "100%",
      display: "flex",
      padding: "0px",
      //"align-content": "stretch",
    };
    var style2 = {
      //flex: 1
      //width: "350px", // This is not responding, it does take the value from the css
      //flex: "flex-grow"
    };
    var options = {
      lineNumbers: true,
      mode: "javascript"
    };

    return (
      <div className = "js-write-editor" style={style1}>
        <CodeMirror style={style2} ref={ref => this.editor = ref} value = {window._BIDE.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }
}

export default JSWriteEditor;