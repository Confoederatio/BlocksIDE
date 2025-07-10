import React, { Component } from 'react'
import { saveAs } from 'file-saver'
import { parseCode } from '../../lib/js2blocks.js'
import { version } from '../../version.json'

class Header extends Component {
  componentDidMount() {
    var openFile = document.getElementById('open-js-file');
    openFile.addEventListener('change', window.openJS, false);
    //this.openFileInput.addEventListener('change', this.openjs, false);
  }
  render() {
    return (
      <div id = "topbar">
        <input id="open-js-file" type="file" name="openjsfile" accept='.js' style={{display: "none"}} ref={ref => this.openFileInput = ref} />
        <button onClick={window.openJS}>Open</button>
        <button onClick={window.saveGeneratedJS}>Save JS Generated</button>
        <button onClick={window.saveJS}>Save JS Editor</button>
        <button onClick = {this.props.toggleSplitScreen} style = {{marginLeft: "8px"}}>Toggle Split-Screen</button>
        <button onClick={window.synchroniseEditors} style = {{marginLeft: "8px"}}>SYNC: JS Editor &lt;- JS Generated</button>
        <button onClick={window.runJS}>RUN: JS Generated</button>
      </div>
    );
  }
}

export default Header;
