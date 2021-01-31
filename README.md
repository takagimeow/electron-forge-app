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

## ESLint

eslintは導入されているのでコーディングスタイルをインストールします。

```bash
yarn add -D eslint-config-airbnb-base eslint-plugin-import eslint-config-airbnb-typescript
```

次にprettierをインストールします

```bash
yarn add -D eslint-config-prettier eslint-plugin-prettier
```

ルートディレクトリに.prettierrcファイルを作成します。

```.prettierrc
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "auto"
}
```

## Reactの導入

tsconfig.jsonに```"jsx": "react"```を追加する。

```bash
yarn add react react-dom
yarn add -D @types/react @types/react-dom
```

react-router-domを導入する

```bash
yarn add react-router-dom
yarn add -D @types/react-router-dom
```
## ホットリロード

標準でONになっているため、コードを更新したら、デベロッパーコンソールを開いた状態で```ctrl-shift-R```を押すと画面が更新される。

## tailwindcssの導入

```bash
yarn add tailwindcss@latest postcss@latest autporefixer@latest
```

webpackのローダーのpostcss-loaderをインストールする。

```bash
yarn add -D postcss-loader
```

webpack.renderer.config.jsでrulesにpushされているオブジェクトを編集してpostcss-loaderを使うように設定する。

```js
// webpack.renderer.config.js

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader', options: { importLoaders: 1 } },
    'postcss-loader',
  ],
});
```

```postcss.config.js```ファイルを作成する。

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

tailwindcssのコンフィグファイルを生成する。

```bash
npx tailwindcss init
```

```src/index.css```に下記のブロックを追加する。

```css
/* ./your-css-folder/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

プロダクション段階で必要のないファイルを削除するため、purgeオプションを設定する。

## Storybookを導入

```bash
npx sb init
```

storybookのインストールが完了した後に```yarn run storybook```を実行しようとすると```ERROR in ./src/stories/header.css```のようなエラーが発生して実行できない。理由はtailwindcssがPostCSS8に依存しているためでstorybookではPostCSS7に依存しているからである。なのでtailwindcssをPostCSS7とも互換性のあるバージョンに変更してあげないといけない。

```bash
yarn remove tailwindcss postcss autoprefixer
yarn add tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

これで動くようになる。もしstorybookがPostCSS8に対応した暁にはtailwindcssを最新のバージョンに変更してあげる必要がある。

```bash
yarn remove tailwindcss @tailwindcss/postcss7-compat
yarn add tailwindcss@latest postcss@latest autoprefixer@latest
```

### 参考にしたサイト
[Error: PostCSS plugin tailwindcss requires PostCSS 8](https://stackoverflow.com/questions/64925926/error-postcss-plugin-tailwindcss-requires-postcss-8)
[PostCSS 7 compatibility build](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build)