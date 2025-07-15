import React, { Component } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import CodeMirror from 'react-codemirror';

class JSReadEditor extends Component {
  constructor () {
    super();

    //Declare local instance variables
    this.state = {
      code: window.main.blockly_code,
      height: `calc(100vh)`,
      height_iterations: 0,
      theme: (window.main.theme) ? window.main.theme : "tomorrow-night-bright"
    };
  }

  componentDidMount () {
    window.main.JSReadEditor = this.editor.codeMirror;
    window.main.JSReadEditorInstance = this;
    window.main.JSReadEditors.push(this);
  }

  render () {
    var options = {
      lineNumbers: true,
      mode: "javascript",
      readOnly: true,
      theme: this.state.theme
    };

    //Post-return handler
    setTimeout(() => {
      if (this.state.height_iterations == 0)
        this.setHeight(window.getActualViewportHeight());
    }, 1);

    //Return statement
    return (
      <div className = "js-read-editor" style = {{
        height: this.state.height,
        width: "100%",
        display: "flex",
        padding: "0px"
      }}>
        <CodeMirror ref = {ref => this.editor = ref} value = {this.state.code}
        options = {options}/>
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
    this.setState({ theme: theme });
  }

  updateCode (arg0_new_code) {
    //Convert from parameters
    var new_code = arg0_new_code;

    this.state.code = new_code;
  }
}

export default JSReadEditor;