//Import modules
global.fs = require("fs");
global.path = require("path");

//Load config
{
  global.load_order = {
    load_directories: [
      "common"
    ],
    load_files: [
      ".config_backend.js"
    ]
  };
  loadConfig();
}

//Init global
{
  //Declare local initialisation constants
  global.current_date = new Date();

  //Initialise global.interfaces; global.main
  global.interfaces = {};
  global.main = {};
    main.events = {
      //Key events
      keys: {},

      //Mouse events
      left_mouse: false,
      mouse_pressed: false,
      right_mouse: false
    };

  //Optimisation
  if (!global.config) global.config = {};
}
