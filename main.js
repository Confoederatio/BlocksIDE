var { app, BrowserWindow } = require("electron");
var path = require("path");

//Initialise functions
{
  var createWindow = () => {
    //Declare local instance variables
    var win = new BrowserWindow({
      width: 3840,
      height: 2160,
      webPreferences: {
        contextIsolation: false,
        enableRemoteModule: false,
        nodeIntegration: true,
        webSecurity: false
      },

      icon: path.join(__dirname, `public/favicon.png`)
    });

    //Load file; open Inspect Element
    win.loadFile("index.html");
    win.webContents.openDevTools();
    win.setMenuBarVisibility(false);

    //Get the default session
    var default_session = session.defaultSession;

    //Set up CORS settings for the default session
    default_session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Access-Control-Allow-Origin': ['*'],
          'Access-Control-Allow-Methods': ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
          'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
        }
      });
    });
  };
}

//App handling
{
  //Launch app when ready
  app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length == 0) createWindow();
    });
    app.on("ready", () => {
      Menu.setApplicationMenu(null);
    });
  });

  //Window lifecycle defaults
  app.on("window-all-closed", () => {
    if (process.platform != "darwin") app.quit();
  });
}
