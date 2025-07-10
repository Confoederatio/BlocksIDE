<div id = "toc">
  <ul>
   <li><summary>
<img src = "https://raw.githubusercontent.com/Confoederatio/Scriptly/refs/heads/master/public/favicon.png" width = 100 height = 100 align = "left"><sup><h1>&nbsp;<mark>SCRIPTLY_</mark></h1></sup>
&nbsp;&nbsp;A JS IDE for block-based and node-based workflows.
    </summary></li>
  </ul>
</div>
<br>
<img src = "https://i.postimg.cc/hjTYphY2/ctd-light-logo.png" height = "64">

## Abstract.
[![Join our community!](https://img.shields.io/discord/548994743925997570?label=Discord&style=for-the-badge)](https://discord.gg/89kQY2KFQz) ![](https://img.shields.io/github/languages/code-size/Confoederatio/AnalyticalEngine?style=for-the-badge) <!--![](https://img.shields.io/github/downloads/Confoederatio/AnalyticalEngine/total?style=for-the-badge)-->

> [!WARNING]
> Scriptly is currently in **beta.**
> This means that certain features, such as node-based editing and transpilers may not be fully implemented at the time of writing.

![](https://github.com/Confoederatio/Scriptly/blob/master/gfx/scriptly_preview_01.png)

<div align = "center"><b>_</b></div>
<br>

**Scriptly** (stylised *SCRIPTLY_*) is an embeddable IDE platform for rapid script development using ES5/ES6 Javascript utiilising Blockly/CodeMirror (BlocksIDE). It was originally developed for the ScriptManager Component in [UF/Vercengen](https://github.com/Confoederatio/UniversalFramework), Confoederatio's main frontend software framework and engine. You may use Scriptly however you wish in your project, so long as attribution is provided to the original contributing base repository owner (see **Attribution**).

Because **Scriptly** is an Electron app, no web demo is provided for it online, although the original repository provided one via [GitHub Pages (Demo)](https://jc-orozco.github.io/BlocksIDE/build/index.html). Iframe bindings are also made available for Scriptly. They should be called through ContentDocument.

Multi-file management for end app components are implemented through Vercengen for the time being, although we plan on bundling it with the standalone version of the app in the future.

## Attribution.

Credit goes to Juan Carlos Oroczo of [BlocksIDE](https://github.com/JC-Orozco/BlocksIDE) for much of the original transpiler code. Since Create React App has been deprecated in the years since the original repository was updated, we have quarantined it as a subsection of the main Electron process and refactored most of the Components to use composition over inheritance.

The original repository ('BlocksIDE') was licenced under Apache 2.0 (2016). Any modifications made by CTD fall underneath MIT.
