import React, { Component } from 'react';
import toolbox from '../common/toolbox.js';

class Blockly extends Component {
  async componentDidMount () {
    var Blockly = window.Blockly; //Extends Blockly as Component in constructor

    var blockly_el = this.blockly_el;

    this.workspace = Blockly.inject(blockly_el, {
      toolbox: toolbox,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.2,
        scaleSpeed: 1.2
      },
      trashcan: true
    });

    function fixFlyoutScaling () {
      //Declare local instance variables
      var flyout_bg_el = document.querySelector('.blocklyFlyoutBackground');
      var flyout_container_el = document.querySelector('.blocklyFlyout');

      if (flyout_bg_el && flyout_container_el) {
        //Get the actual flyout container dimensions
        var flyout_rect = flyout_container_el.getBoundingClientRect();

        var height = flyout_rect.height;
        var width = flyout_rect.width;

        //Set flyout_bg_el's dynamic path
        flyout_bg_el.setAttribute('d', `M 0,0 h ${width} a 8 8 0 0 1 8 8 v ${height - 16} a 8 8 0 0 1 -8 8 h -${width} z`);
      }
    }

    function interceptFlyoutTransforms () {
      //Declare local instance variables
      var targets = [
        '.blocklyFlyout .blocklyBlockCanvas',
        '.blocklyFlyout .blocklyBubbleCanvas'
      ];

      //Iterate over all targets
      targets.forEach((selector) => {
        var local_element = document.querySelector(selector);

        if (local_element) {
          // Override setAttribute to intercept transform changes
          const originalSetAttribute = local_element.setAttribute;
          local_element.setAttribute = function(name, value) {
            if (name === 'transform' && value.includes('scale(')) {
              // Preserve translate, force scale(1)
              value = value.replace(/scale\([^)]+\)/g, 'scale(1)');
            }
            return originalSetAttribute.call(this, name, value);
          };
        }
      });
    }

    //Call after Blockly initialization
    interceptFlyoutTransforms();
    this.workspace.addChangeListener(window.main.updateWorkspace);

    //Declare onresize handler
    var onresize = (e) => {
      blockly_el.style.left = '0px' // x + 'px';
      blockly_el.style.width = "100%"
      blockly_el.style.height = "calc(100% - " + document.querySelector(`.react-tabs`).offsetHeight + "px)";
      window.Blockly.svgResize(this.workspace);

      fixFlyoutScaling();
    };

    //Initialise onresize, flyout scaling fixes
    window.main.resize.addCallback(onresize);
    onresize();
    window.Blockly.svgResize(this.workspace);
    fixFlyoutScaling();
  }

  render () {
    //Return statement
    return (
      <div id = "blocklyContainer" ref = {ref => this.blocklyContainer = ref} style = {{
        width: "100%",
        height: "100%"
      }}>
        <div id = "blockly_el" ref = {ref => this.blockly_el = ref} style = {{
          position: "absolute"
        }}></div>
      </div>
    );
  }

  shouldComponentUpdate () {
    return false;
  }
}

export default Blockly;
