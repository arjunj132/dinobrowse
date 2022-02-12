# DinoBrowse

You know what would be fun? Being able to browse the web BUT as soon as the page loads you hack it with JavaScript.

Hmm... Let's try that! I created a electron-based simple browser with Node. So your life would be much easier. Anyway, lets go ahead and install it!

## Install

### NPM


Create file package.json with:
```json
{
  "name": "dino",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "cd node_modules/dinobrowse; python3 -m dino"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Then run:

```bash
npm i https://github.com/arjunj132/dinobrowse
```


### Git
Make sure you clone this repo and cd:

```bash
git clone https://github.com/arjunj132/DinoBrowse.git
cd DinoBrowse
```

Lets install the dependencies:

```bash
npm i
```
## Usage

### NPM
Run this:
```
npm start
```
Type the url, the JS code, and then you are done!

### Git

```bash
python3 -m dino
```
Type the url, the JS code, and then you are done!
