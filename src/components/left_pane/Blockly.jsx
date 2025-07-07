// Copyright 2016 Juan Carlos Orozco
// Licensed under the Apache License, Version 2.0 (the "License");
// https://github.com/JC-Orozco/BlocksIDE

import React, { Component } from 'react';
//import BlocklyEditor from 'react-blockly-component';
//import Blockly from '../blockly';

//var Blockly_this
class Blockly extends Component {
  componentDidMount() {
    let Blockly = window.Blockly;

    var toolbox = `
      <xml id="toolbox" style="display: none">    
      <category id="catLogic" name="Logic" colour="210">
        <block type="controls_if"></block>
        <block type="bi_logic_compare"></block>
        <block type="bi_logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
      </category>
      <category id="catLoops" name="Loops" colour="120">
        <block type="controls_repeat_ext">
          <value name="TIMES">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
        </block>
        <block type="controls_whileUntil"></block>
        <block type="bi_for"></block>
        <block type="bi_for_in"></block>
        <block type="bi_switch"></block>
        <block type="bi_case"></block>
        <block type="bi_continue"></block>
        <block type="bi_break"></block>
        <block type="controls_for">
          <value name="FROM">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="TO">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
          <value name="BY">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
        </block>
        <block type="controls_forEach"></block>
        <block type="controls_forEachKey"></block>
        <block type="controls_flow_statements"></block>
        <block type="bi_throw"></block>
        <block type="bi_yield"></block>
        <block type="bi_yield_return"></block>      
      </category>
      <category id="catMath" name="Math" colour="230">
        <block type="math_number"></block>
        <block type="bi_parenthesis"></block>
        <block type="bi_unary"></block>
        <block type="bi_unary_return"></block>
        <block type="bi_unary_postfix"></block>
        <block type="bi_unary_postfix_return"></block>
        <block type="bi_math_arithmetic">
          <value name="A">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="B">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
        </block>
        <block type="math_single">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">9</field>
            </shadow>
          </value>
        </block>
        <block type="math_trig">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">45</field>
            </shadow>
          </value>
        </block>
        <block type="math_constant"></block>
        <block type="math_number_property">
          <value name="NUMBER_TO_CHECK">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
        <block type="math_change">
          <value name="DELTA">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
        </block>
        <block type="math_round">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">3.1</field>
            </shadow>
          </value>
        </block>
        <block type="math_on_list"></block>
        <block type="math_modulo">
          <value name="DIVIDEND">
            <shadow type="math_number">
              <field name="NUM">64</field>
            </shadow>
          </value>
          <value name="DIVISOR">
            <shadow type="math_number">
              <field name="NUM">10</field>
            </shadow>
          </value>
        </block>
        <block type="math_constrain">
          <value name="VALUE">
            <shadow type="math_number">
              <field name="NUM">50</field>
            </shadow>
          </value>
          <value name="LOW">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="HIGH">
            <shadow type="math_number">
              <field name="NUM">100</field>
            </shadow>
          </value>
        </block>
        <block type="math_random_int">
          <value name="FROM">
            <shadow type="math_number">
              <field name="NUM">1</field>
            </shadow>
          </value>
          <value name="TO">
            <shadow type="math_number">
              <field name="NUM">100</field>
            </shadow>
          </value>
        </block>
        <block type="math_random_float"></block>
      </category>
      <category id="catText" name="Text" colour="160">
        <block type="bi_string_return"></block>
        <block type="text_join"></block>
        <block type="text_append">
          <value name="TEXT">
            <shadow type="text"></shadow>
          </value>
        </block>
        <block type="text_length">
          <value name="VALUE">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_isEmpty">
          <value name="VALUE">
            <shadow type="text">
              <field name="TEXT"></field>
            </shadow>
          </value>
        </block>
        <block type="text_indexOf">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">text</field>
            </block>
          </value>
          <value name="FIND">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_charAt">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">text</field>
            </block>
          </value>
        </block>
        <block type="text_getSubstring">
          <value name="STRING">
            <block type="variables_get">
              <field name="VAR">text</field>
            </block>
          </value>
        </block>
        <block type="text_changeCase">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_trim">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_print">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <block type="text_prompt_ext">
          <value name="TEXT">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>
        <!-- <block type="text_comment"></block> --> <!-- TODO: This block needs to be fixed. -->
      </category>
      <category id="catLists" name="Lists" colour="260">
        <!-- <block type="lists_create_with">
          <mutation items="0"></mutation>
        </block> -->
        <block type="lists_create_with"></block>
        <block type="bi_index"></block>
        <block type="lists_repeat">
          <value name="NUM">
            <shadow type="math_number">
              <field name="NUM">5</field>
            </shadow>
          </value>
        </block>
        <block type="lists_length"></block>
        <block type="lists_isEmpty"></block>
        <block type="lists_indexOf">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">list</field>
            </block>
          </value>
        </block>
        <block type="lists_getIndex">
          <value name="VALUE">
            <block type="variables_get">
              <field name="VAR">list</field>
            </block>
          </value>
        </block>
        <block type="lists_setIndex">
          <value name="LIST">
            <block type="variables_get">
              <field name="VAR">list</field>
            </block>
          </value>
        </block>
        <block type="lists_getSublist">
          <value name="LIST">
            <block type="variables_get">
              <field name="VAR">list</field>
            </block>
          </value>
        </block>
        <block type="lists_split">
          <value name="DELIM">
            <shadow type="text">
              <field name="TEXT">,</field>
            </shadow>
          </value>
        </block>
      </category>
      <category name="Maps" colour="345">
        <!-- <block type="maps_create_empty"></block> -->
        <block type="maps_create_with"></block>
        <block type="maps_length"></block>
        <block type="maps_isempty"></block>
        <block type="maps_create"></block>
        <block type="bi_maps_set"></block>
        <block type="bi_maps_get"></block>
        <block type="maps_getIndex"></block>
        <block type="maps_setIndex"></block>
        <block type="maps_keys"></block>
      </category>
      <category id="catColour" name="Color" colour="20">
        <block type="colour_picker"></block>
        <block type="colour_random"></block>
        <block type="colour_rgb">
          <value name="RED">
            <shadow type="math_number">
              <field name="NUM">100</field>
            </shadow>
          </value>
          <value name="GREEN">
            <shadow type="math_number">
              <field name="NUM">50</field>
            </shadow>
          </value>
          <value name="BLUE">
            <shadow type="math_number">
              <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
        <block type="colour_blend">
          <value name="COLOUR1">
            <shadow type="colour_picker">
              <field name="COLOUR">#ff0000</field>
            </shadow>
          </value>
          <value name="COLOUR2">
            <shadow type="colour_picker">
              <field name="COLOUR">#3333ff</field>
            </shadow>
          </value>
          <value name="RATIO">
            <shadow type="math_number">
              <field name="NUM">0.5</field>
            </shadow>
          </value>
        </block>
      </category>
      <sep></sep>
      
  <!--
      <category name="Variables" custom="VARIABLE"></category>
      <category name="Functions" custom="PROCEDURE"></category>
  -->
      <category id="catVariables" name="Variables" colour="330">
        <block type="bi_var"></block>
        <block type="bi_var_name"></block>      
        <block type="bi_assignment"></block>      
        <block type="bi_assignment_return"></block>      
        <block type="bi_field"></block>
        <block type="bi_field_return"></block>
      </category>
      <category id="catFunctions" name="Functions" colour="290">
        <block type="bi_function"></block>
        <block type="bi_function_return"></block>
  <!--      <block type="bi_call"></block>      -->
        <block type="bi_call_editable"></block>      
        <block type="bi_call_editable_return"></block>     <block type="bi_direct_call_editable"></block>      
        <block type="bi_direct_call_editable_return"></block>      
        <block type="bi_return"></block>
        <block type="bi_spread"></block>
      </category>
      <category id="catClasses" name="Classes" colour="55">
  <!--      <block type="bi_adaptor"></block> -->
  <!--      <block type="bi_statement"></block> -->
        <block type="bi_new"></block>
        <block type="bi_anonymous_class"></block>
        <block type="bi_class"></block>
        <block type="bi_static"></block>      
        <block type="bi_get"></block>
        <block type="bi_set"></block>
      </category>
  
  
      <category name="Other" colour="90">
        <block type="bi_try_catch"></block>      
        <block type="bi_catch"></block>      
        <block type="bi_export"></block>
        <block type="bi_import"></block>
        <block type="bi_import_as"></block>
        <block type="bi_comment"></block>
      </category>
      <sep></sep>
      <category name="Library" expanded="true">
        <!--
        <block type="bi_var"></block>
        <category name="Test">
          <block type="bi_var"></block>
        </category>
        -->
      </category>
    </xml>`;

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

    this.workspace.addChangeListener(window._BIDE.updateWorkspace);
    var onresize = (e) => {
      blocklyDiv.style.left = '0px' // x + 'px';
      blocklyDiv.style.width = "100%"
      blocklyDiv.style.height = "calc(100% - " + document.querySelector(`.react-tabs`).offsetHeight + "px)";
      Blockly.svgResize(this.workspace);

      fixFlyoutScaling();
    };
    //window.addEventListener('resize', onresize, false);
    window._BIDE.resize.addCallback(onresize)
    onresize();
    Blockly.svgResize(this.workspace);
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
