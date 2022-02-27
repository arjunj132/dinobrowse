/*
This holds the main code for DinoBrowse, node browser.

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

const { app, BrowserWindow, Menu, MenuItem, shell, ipcMain } = require('electron')
const path = require('path')



ipcMain.handle('url', async function (event, path) {
  http_check()
  return url
})

// Start privacy features:
const privacy = require('@dothq/electron-privacy');


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
    if (url.includes("file:///") == true) { raw = url.split('file:///')[1]; } else {
    raw = url;
    if (url.includes("/") == true) {
      raw1 = raw;
      raw2 = raw1.split("/");
      raw = raw2[0];
    }
		url = 'http://' + url;

  }}
}


// The isValidHttpUrl function is taken from https://stackoverflow.com/a/43467144/17245189
function isValidHttpUrl(string) {
  let url1;

  try {
    url1 = new URL(string);
  } catch (_) {
    return false;
  }

  if (url.includes('file:///')) {
    file1 = url;
    url = raw;
  }
  return url1.protocol === "http:" || url1.protocol === "https:" || file1.includes("file:///");
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true
    }
  })

// checks:
  try {
    http_check()
    console.log('Contacting host ' + raw);
    valid = isValidHttpUrl(url)
    if (valid == true) {
      // app finally loaded with all checks!
      win.loadFile('index.html')
      // run hacks
      const contents = win.webContents
      contents.executeJavaScript(hacks, true)
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

      const menu1 = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu1)


      const ctxMenu = new Menu()
      ctxMenu.append(new MenuItem({
        label: 'Inspect',
        click: function() {
            contents.toggleDevTools()
        }
      }))
      ctxMenu.append(new MenuItem({
        label: 'Back',
        click: () => {
          contents.executeJavaScript(`
window.history.back()
            `, true)
        }
      }))
      ctxMenu.append(new MenuItem({
        label: 'Forward',
        click: () => {
          contents.executeJavaScript(`
window.history.forward()
            `, true)
        }
      }))
      ctxMenu.append(new MenuItem({
        label: 'Copy',
        click: () => {
          contents.executeJavaScript(`
            function updateClipboard(newClip) {
              navigator.clipboard.writeText(newClip).then(function() {
              }, function() {
                console.error('DinoBrowse: Failed to update clipboard')
              });
            }

            updateClipboard(window.getSelection().toString())
            `)
        }
      }))
      ctxMenu.append(new MenuItem({
        label: 'Paste',
        click: () => {
          contents.executeJavaScript(`
            navigator.clipboard.readText().then(clipText =>
                document.activeElement.value = clipText
            )
            `)
        }
      }))
      ctxMenu.append(new MenuItem({
        label: 'Reload',
        click: () => {
          contents.executeJavaScript(`
            window.location.reload();
            `)
        }
      }))
      ctxMenu.append(new MenuItem({
        label: 'Change URL',
        click: () => {
          const prompt = require('electron-prompt');
          prompt({
              title: 'Change URL',
              label: 'Enter URL to redirect you to here:',
              value: win.webContents.getURL(),
              inputAttrs: {
                  type: 'url'
              },
              type: 'input'
          })
          .then((r) => {
              if(r === null) {
                  console.log('User cancelled operation "Change URL"');
              } else {
                  console.log('Process main.js is redirecting to server', r);
                  win.loadURL(r)
              }
          })
          .catch(console.error);
        }
      }))
      ctxMenu.append(new MenuItem({
        label: 'YouTube Skip Ad',
        click: () => {
          contents.executeJavaScript(`(function() {
            document.querySelector('video').currentTime = document.querySelector('video').duration
          })();`, true)
        }
        }))

        ctxMenu.append(new MenuItem({
          label: 'Clear all popups and ads',
          click: () => {
            contents.executeJavaScript(`
            (function() {
              /* Ad-B-Gone: Bookmarklet that removes obnoxious ads from pages */
              var selectors = [ /* By ID: */ '#sidebar-wrap', '#advert', '#xrail', '#middle-article-advert-container', '#sponsored-recommendations', '#around-the-web', '#sponsored-recommendations', '#taboola-content', '#taboola-below-taboola-native-thumbnails', '#inarticle_wrapper_div', '#rc-row-container', '#ads', '#at-share-dock', '#at4-share', '#at4-follow', '#right-ads-rail', 'div#ad-interstitial', 'div#advert-article', 'div#ac-lre-player-ph', /* By Class: */ '.ad', '.avert', '.avert__wrapper', '.middle-banner-ad', '.advertisement', '.GoogleActiveViewClass', '.advert', '.cns-ads-stage', '.teads-inread', '.ad-banner', '.ad-anchored', '.js_shelf_ads', '.ad-slot', '.antenna', '.xrail-content', '.advertisement__leaderboard', '.ad-leaderboard', '.trc_rbox_outer', '.ks-recommended', '.article-da', 'div.sponsored-stories-component', 'div.addthis-smartlayers', 'div.article-adsponsor', 'div.signin-prompt', 'div.article-bumper', 'div.video-placeholder', 'div.top-ad-container', 'div.header-ad', 'div.ad-unit', 'div.demo-block', 'div.OUTBRAIN', 'div.ob-widget', 'div.nwsrm-wrapper', 'div.announcementBar', 'div.partner-resources-block', 'div.arrow-down', 'div.m-ad', 'div.story-interrupt', 'div.taboola-recommended', 'div.ad-cluster-container', 'div.ctx-sidebar', 'div.incognito-modal', '.OUTBRAIN', '.subscribe-button', '.ads9', '.leaderboards', '.GoogleActiveViewElement', '.mpu-container', '.ad-300x600', '.tf-ad-block', '.sidebar-ads-holder-top', '.ads-one', '.FullPageModal__scroller', '.content-ads-holder', '.widget-area', '.social-buttons', '.ac-player-ph']
              for (let i in selectors) {
                  let nodesList = document.querySelectorAll(selectors[i]);
                  for (let i = 0; i < nodesList.length; i++) {
                      let el = nodesList[i];
                      if (el && el.parentNode) el.parentNode.removeChild(el);
                  }
              }
          })();
          `, true)
          }
          }))
      win.webContents.on('context-menu', function(e, params) {
        ctxMenu.popup(win, params.x, params.y)
      })
      ctxMenu.append(new MenuItem({
        label: 'About Dino',
        click: () => {
          const { dialog } = require('electron')
          dialog.showMessageBox({
            message: 'v1.0.3 DinoBrowse (Node/Electron/Chromium)\n(c) Arjun J'
          })
        }
      }))
app.on("web-contents-created", (...[/* event */, webContents]) => {

//Webview is being shown here as a window type
webContents.on("context-menu", (event, click) => {
  event.preventDefault();
  ctxMenu.popup(webContents)
}, false);
});
      // Block ads:
          const { ElectronBlocker } = require('@cliqz/adblocker-electron');
          const fetch = require('cross-fetch'); // required 'fetch'

          ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
              blocker.enableBlockingInSession(win.webContents.session);
          });
      
      


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
