<img src="logo.png" align="right" width="15%"/>

# ScureGPT
Secure ChatGPT interfacing powered by electron.

Supports compiling via electron packager. Install and run it with:

```bash
npm install --save-dev electron-packager
npm run make
```

Keep in mind you also need a copy of the WINE project and need to be on Linux.

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.
- `preload.js` - A content script that runs before the renderer process loads.


## To Use

To clone and run this repository you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install dependencies
npm install
# Run the app
npm start
```

## License

[SPL-R5](LICENSE.md)

