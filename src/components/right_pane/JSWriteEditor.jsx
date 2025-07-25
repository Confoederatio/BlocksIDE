import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';

import { parseCode } from '../../lib/js2blocks.js';

class JSWriteEditor extends Component {
  constructor() {
    super();
    console.log("Constructor called.");

    //Declare local instance variables
    this.state = {
      code: window.main.code,
      height: `calc(100vh)`,
      height_iterations: 0,
      theme: (window.main.theme) ? window.main.theme : "tomorrow-night-bright"
    };
  }

  componentDidMount () {
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

  render () {
    //Declare local instance variables
    var options = {
      lineNumbers: true,
      mode: "javascript",
      theme: this.state.theme
    };

    //Post-return handler
    setTimeout(() => {
      if (this.state.height_iterations == 0)
        this.setHeight(window.getActualViewportHeight());
    }, 1);

    //Return statement
    return (
      <div className = "js-write-editor" style = {{
        height: this.state.height,
        width: "100%",
        display: "flex",
        padding: "0px"
      }}>
        <CodeMirror ref={ref => this.editor = ref} value = {window.main.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
    );
  }

  setHeight (arg0_height) {
    //Convert from parameters
    var height = arg0_height;

    //Set state
    this.setState({
      height: height,
      height_iterations: this.state.height_iterations + 1
    }, (e) => {
      this.render();
    });
  }

  setTheme (arg0_theme) {
    //Convert from parameters
    var theme = arg0_theme;

    //Set state
    this.setState({ theme: theme }, (e) => {
      this.render();
      console.log(`this.render()`, this.state);
    });
  }

  updateCode (newCode) {
    this.state.code = newCode;
    window.main.code = newCode

    parseCode(newCode)
    window.main.code_prev = window.main.code;
    console.log(`JSWriteEditor: updateCode()`);
  }
}

export default JSWriteEditor;