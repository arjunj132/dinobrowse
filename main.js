/*
This holds the source code for DinoBrowse, a hack-the-page-with-JS-as-soon-as-it-starts-up browser.

Created with ElectronJS.

Copyright (c) 2022 Arjun J All Rights Reserved.




License:

Copyright (c) 2022 Arjun J

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

url = process.argv[2];
hacks = process.argv[3];


const { app, BrowserWindow, Menu } = require('electron')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function http_check() {
  if (url.includes("https://") == true || url.includes("http://") == true) {
    raw1 = url;
		raw2 = raw1.split("/");
		raw = raw2[2];
  }
  else {
    raw = url;
    if (url.includes("/") == true) {
      raw1 = raw;
      raw2 = raw1.split("/");
      raw = raw2[0];
    }
		url = 'http://' + url;

  }
}


// The isValidHttpUrl function is taken from https://sstackoverflow.com/a/43467144/17245189
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

// checks:
  try {
    http_check()
    console.log('Contacting host ' + raw);
    valid = isValidHttpUrl(url)
    if (valid == true) {
      // app finally loaded with all checks!
      win.loadURL(url)
      // run hacks
      const contents = win.webContents
     contents.executeJavaScript(hacks, true)
    } else {
      console.log('DINOBROWSE: ERROR: URL is not valid');
      win.loadFile('err.html')
    }
  } catch (e) {
    console.log('DINOBROWSE: ERROR: ' + e);
    win.loadFile('err.html')
  }
}




app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// menu code below taken from https://www.electronjs.org/docs/latest/api/menu
const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
