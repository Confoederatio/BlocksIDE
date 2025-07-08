import React, { Component } from 'react';
import toolbox from '../common/toolbox.js';

class Blockly extends Component {
  async componentDidMount () {
    var Blockly = window.Blockly; //Extends Blockly as Component in constructor

    var blocklyContainer = this.blocklyContainer; //document.getElementById('blocklyContainer');
    var blocklyDiv = this.blocklyDiv; //document.getElementById('blocklyDiv');
    this.workspace = Blockly.inject(blocklyDiv,
        { toolbox: toolbox,
          zoom:
            { controls: true,
              wheel: true,
              startScale: 1.0,
              maxScale: 3,
              minScale: 0.2,
              scaleSpeed: 1.2},
          trashcan: true});

    function fixFlyoutScaling() {
      // Fix block scaling
      const flyoutCanvas = document.querySelector('.blocklyFlyout .blocklyBlockCanvas');

      // Fix background width - use actual flyout dimensions
      const flyoutBg = document.querySelector('.blocklyFlyoutBackground');
      const flyoutContainer = document.querySelector('.blocklyFlyout');

      if (flyoutBg && flyoutContainer) {
        // Get the actual flyout container dimensions
        const rect = flyoutContainer.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Reconstruct the entire path properly
        const newPath = `M 0,0 h ${width} a 8 8 0 0 1 8 8 v ${height - 16} a 8 8 0 0 1 -8 8 h -${width} z`;
        flyoutBg.setAttribute('d', newPath);
      }
    }

    function interceptFlyoutTransforms() {
      const targets = [
        '.blocklyFlyout .blocklyBlockCanvas',
        '.blocklyFlyout .blocklyBubbleCanvas'
      ];

      targets.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          // Override setAttribute to intercept transform changes
          const originalSetAttribute = element.setAttribute;
          element.setAttribute = function(name, value) {
            if (name === 'transform' && value.includes('scale(')) {
              // Preserve translate, force scale(1)
              value = value.replace(/scale\([^)]+\)/g, 'scale(1)');
            }
            return originalSetAttribute.call(this, name, value);
          };
        }
      });
    }

    // Call after Blockly initialization
    interceptFlyoutTransforms();

    this.workspace.addChangeListener(window.main.updateWorkspace);
    var onresize = (e) => {
      blocklyDiv.style.left = '0px' // x + 'px';
      blocklyDiv.style.width = "100%"
      blocklyDiv.style.height = "calc(100% - " + document.querySelector(`.react-tabs`).offsetHeight + "px)";
      window.Blockly.svgResize(this.workspace);

      fixFlyoutScaling();
    };
    //window.addEventListener('resize', onresize, false);
    window.main.resize.addCallback(onresize)
    onresize();
    window.Blockly.svgResize(this.workspace);
    fixFlyoutScaling();
  }
  render() {
    console.log("Rendering Blockly!");

    var styleDiv = {
      width: "100%",
      height: "100%",
      //flex: 1,
      //display: "flex"
    }
    var styleBArea = {
      //height: "100", // Add flex to go 100%
      //width: "100%",
      //height: "100%",
      //flex: 1
    }
    var styleBDiv = {
      position: "absolute"
    }
    //<div id="blocklyArea" ref={ref => this.blocklyArea = ref} style={styleBArea}></div>
    return(
      <div id="blocklyContainer" ref={ref => this.blocklyContainer = ref} style={styleDiv}>
        <div id="blocklyDiv" ref={ref => this.blocklyDiv = ref} style={styleBDiv}></div>
      </div>
    );
  }

  shouldComponentUpdate() {
    // This component's own DOM is static.
    // The Blockly library manages the SVG content inside it.
    // We never want React to re-render this component's div structure.
    return false;
  }
}

export default Blockly;
