/*
This holds the one of the code files for DinoBrowse, node browser.

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

const { ipcRenderer } = require('electron')
var webview = document.getElementById('browser')
const webview1 = document.querySelector('webview')
const axios = require('axios');


// Open url in page webview
var url_find = ipcRenderer.invoke('url').then((result) => {
    webview.src = result;
})

// Define go back and forward in webview
function goBack() {
    webview1.goBack()
}
function goForward() {
    webview1.goForward()
}

// Define address bar change url
function search() {
    // get url:
    result = document.getElementById('url').value
    if (result.includes("https://") == true || result.includes("http://") == true) {
        url = result
            // open url:
    console.log('Navigating to ' + url)
    document.getElementById('browser').src = url;
    // change security:
    if (url.includes('https://') == true) {
        document.getElementById('secure').className = 'bi bi-shield-check';
    } else {
        document.getElementById('secure').className = 'bi bi-shield-exclamation';
    }
      }
      else {
        if (result.includes("file:///") == true) { url = result 
        // open url:
        console.log('Navigating to ' + url)
        document.getElementById('browser').src = url;
        // change security:
        document.getElementById('secure').className = '';
        document.getElementById('secure').innerHTML = '<code>file</code>';
        document.getElementById('secure').title = 'File: If you downloaded it frome somewhere, ';
    } else {   
            function http_url(e) {
                url = 'http://' + result
                // open url:
                console.log('Navigating to ' + url)
                document.getElementById('browser').src = url;
                // change security:
                if (url.includes('https://') == true) {
                    document.getElementById('secure').className = 'bi bi-shield-check';
                } else {
                    document.getElementById('secure').className = 'bi bi-shield-exclamation';
                }
            }
            function ajax(a, b, c){ // URL, callback, just a placeholder
                c = new XMLHttpRequest;
                c.open('GET', a);
                c.onload = b;
                c.addEventListener('error', http_url);
                c.send()
            }
            function callback(e){
                url = 'https://' + result
                // open url:
                console.log('Navigating to ' + url)
                document.getElementById('browser').src = url;
                // change security:
                if (url.includes('https://') == true) {
                    document.getElementById('secure').className = 'bi bi-shield-check';
                    document.getElementById('secure').title = 'Secure';
                } else {
                    document.getElementById('secure').className = 'bi bi-shield-exclamation';
                    document.getElementById('secure').title = 'Unsecure';
                }
              }
              ajax('https://' + result, callback);
        }
      }
      // change url in bar
      webview.addEventListener('dom-ready', () => {
      document.getElementById('url').value = document.getElementById('browser').src;
    })
}

function restart() {
    webview.addEventListener('dom-ready', () => {
    document.getElementById('url').value = document.getElementById('browser').src;
    })
}

function reload() {
    webview.reload()
}