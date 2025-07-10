var { app, BrowserWindow, ipcMain, session } = require("electron");
var path = require("path");
var { performance } = require("perf_hooks");

var latest_fps = 0;
var scriptly_version = "0.6b";
var title_update_interval;
var win;

//Initialise functions
{
  var createWindow = () => {
    //Declare local instance variables
    win = new BrowserWindow({
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

    //Listen for FPS updates from the renderer process
    ipcMain.on("update-fps", (event, fps) => {
      latest_fps = fps;
    });

    //Update the title every second with the latest data
    title_update_interval = setInterval(function () {
      var memory_usage = process.memoryUsage();

      var heap_used_mb = (memory_usage.heapUsed/1024/1024).toFixed(2);
      var rss_mb = (memory_usage.rss/1024/1024).toFixed(2);
      var title_string = `Scriptly ${scriptly_version} - FPS: ${latest_fps} | RAM: RSS ${rss_mb}MB/Heap ${heap_used_mb}MB`;

      win.setTitle(title_string);
    }, 1000);

    //Get the default session
    try {
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
    } catch (e) {
      console.warn(e);
    }
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
