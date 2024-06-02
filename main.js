// Modules to control application life and create native browser window
const {app, BrowserWindow, session, ipcMain} = require('electron')
const path = require('path')
const fetch = require("cross-fetch")
const { ElectronChromeExtensions } = require('electron-chrome-extensions')

ipcMain.on('windowmaker', (event, arg) => {
  createWindow();
})

function createWindow () {
  // Create the browser window.

  const extensions = new ElectronChromeExtensions({
    session: session.defaultSession
  })

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      devTools: false,
      nodeIntegration: true,
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.removeMenu()
  mainWindow.setMinimumSize(640, 480)

  
const toBlock = [
  "*://*.doubleclick.*",
  "*://s.innovid.com/*",
  "*://partner.googleadservices.com/*",
  "*://*.googlesyndication.com/*",
  "*://*.google-analytics.com/*",
  "*://creative.ak.fbcdn.net/*",
  "*://*.adbrite.com/*",
  "*://*.exponential.com/*",
  "*://*.quantserve.com/*",
  "*://*.scorecardresearch.com/*",
  "*://*.zedo.com/*",
  "*://*.a-ads.com/*",
  "*://*.777partner.com/*",
  "*://*.77tracking.com/*",
  "*://*.abc-ads.com/*",
  "*://*.aaxads.com/*",
  "*://*.adizio.com/*",
  "*://*.adjix.com/*",
  "*://*.adjug.com/*",
  "*://*.adjuggler.com/*",
  "*://*.trafficjunky.net/*",
  "*://*.trafficleader.com/*",
  "*://*.trafficrouter.io/*",
  "*://*.monerominer.rocks/*",
  "*://*.2mdn.net/*",
  "*.exe",
  "*.vbs",
  "*://*.googlesyndication.*",
  "*pixels*",
  "*telemetry*",
  "*analytics*",
  "*://ads.*.com*",
  "*ae/us/audience*",
  "*/api/v*/science*",
  "*/api/v*/typing*"
  ]
  
const regexPatterns = [
"r[0-100]+---sn-.*\.googlevideo\.com$/g",
"r[0-100]+-sn-.*\.googlevideo\.com$/g"
] 
  
  function containsAD(url) {
    var i;
    for (i = 0; i < toBlock.length; i++) {
        let regex = toBlock[i].replace(/\*/g, "[^ ]*");
        if (url.match(regex)) {
            return true;
        }
    }
    
    for (i = 0; i < regexPatterns.length; i++) {
        let regex = regexPatterns[i]
        if (url.match(regex)) {
            return true;
        }
    }

    return false;
  }

  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    if (containsAD(details.url)) {
      return callback({cancel: true})
    }
    return callback({})
  })

  extensions.addTab(mainWindow.webContents, mainWindow)
  
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let x = createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
