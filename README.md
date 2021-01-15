# Electron Forge App テンプレート

## 準備

typescript-webpackテンプレートを使用してプロジェクトを作成します。

```bash
yarn create electron-app my-new-app --template=typescript-webpack
```

動くかどうか確かめます。

```bash
yarn start
```

## Webpack

Electron Forgeでは必ず2つwebpack用のコンフィグファイルを作成しないといけません。
ひとつはメインプロセス用の```mainConfig```。もう一つがレンダラープロセス用の```renderer.config```です。
これらの情報はpackage.jsonの```plugins```フィールドに記述されています。

```json
// package.json
{
  ...
  plugins: [
    ['@electron-forge/plugin-webpack', {
      mainConfig: './webpack.main.config.js',
      renderer: {
        config: './webpack.renderer.config.js',
        entryPoints: [{
          html: './src/renderer/index.html',
          js: './src/renderer/index.js',
          name: 'main_window'
        }]
      }
    }]
  ]
}
```

webpackを使ってトランスパイルを行うと、```.webpack```フォルダに```main```フォルダと```renderer```フォルダが作成されるので、package.jsonファイルのmainフィールド（エントリーポイント）は```.webpack/main```を指している。

そして、```@electron-forge/plugin-webpack```プラグインが自動的にグローバル環境変数である```MAIN_WINDOW_WEBPACK_ENTRY```と```MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY```を定義してくれています。これらはレンダラープロセスのエントリーポイントを指しています。なのでloadURLが呼び出されている場所では直接ファイルの場所を指定するのではなく、これらの環境変数のどちらかが使われています。

```ts
// src/index.ts

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};
```