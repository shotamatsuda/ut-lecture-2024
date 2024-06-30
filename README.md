# U-Tokyo Lecture 2024

受講者へ。次の講義までに、[環境構築](#環境構築)と[サンプルコードの実行](#サンプルコードの実行)を事前に行ってください。

## 環境構築

Node.js v20 がインストールされている環境を準備します。

ここでは、macOS と Windows を想定して、構築手順を説明します。NVM (Node Version Manager) 経由で [Node.js](https://nodejs.org/en) v20 をインストールし、[NPM (Node Package Manager)](https://docs.npmjs.com/about-npm) 経由で Yarn をインストールする手順です。すでに Node.js v20 がインストールされている場合は、このステップを飛ばしてください。

### NVM のインストール

**macOS**

1. [NVM](https://github.com/nvm-sh/nvm) をインストールします。[公式ドキュメント](https://github.com/nvm-sh/nvm#installing-and-updating)を参照するか、次の手順に従ってください。すでにインストールされている場合は、このステップを飛ばしてください。

   1. Terminal.app を開き、次のいずれかのコマンドを実行します。

      ```sh
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
      ```

      もし、`command not found: curl` と表示される場合は、次のコマンドを実行します。

      ```sh
      wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
      ```

**Windows**

1. [Windows PowerShell](https://learn.microsoft.com/ja-jp/powershell/scripting/windows-powershell/overview?view=powershell-7.4) をインストールします。[公式ドキュメント](https://learn.microsoft.com/ja-jp/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4)を参照するか、次の手順に従ってください。すでにインストールされている場合は、このステップを飛ばしてください。

   1. [Windows PowerShell 7.4 インストーラー](https://github.com/PowerShell/PowerShell/releases/download/v7.4.0/PowerShell-7.4.0-win-x64.msi)をダウンロードします。
   1. インストーラーを開き、画面に表示される手順に従ってインストールを完了します。

1. [NVM](https://github.com/coreybutler/nvm-windows) をインストールします。[公式ドキュメント](https://github.com/coreybutler/nvm-windows#installation--upgrades)を参照するか、次の手順に従ってください。すでにインストールされている場合は、このステップを飛ばしてください。

   1. [NVM インストーラー](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe)をダウンロードします。
   1. インストーラーを開き、画面に表示される手順に従ってインストールを完了します。

### Node.js のインストール

**macOS**

1. Terminal.app を開き、次のコマンドを実行して、Node.js v20 をインストールします。

   ```sh
   nvm install lts/iron
   ```

1. さらに次のコマンドを実行して、正しくインストールされたか確認します。

   ```sh
   nvm use lts/iron
   ```

   `Now using node vv20.11.0 (npm v10.2.4)` というメッセージが表示されれば OK です。

1. 念のため、次のコマンドも実行します。

   ```sh
   node -v
   npm -v
   ```

   表示されるバージョンが、2. で表示されたバージョンと一致していれば OK です。

**Windows**

1. PowerShell を開き、次のコマンドを実行して、Node.js v20 をインストールします。

   ```sh
   nvm install iron
   ```

1. さらに次のコマンドを実行して、正しくインストールされたか確認します。

   ```sh
   nvm use iron
   ```

   `Now using node vv20.11.0 (64-bit)` というメッセージが表示されれば OK です。

1. 念のため、次のコマンドも実行します。

   ```sh
   node -v
   npm -v
   ```

   表示されるバージョンが、2. で表示されたバージョンと一致していれば OK です。

### Yarn のインストール

1. Terminal.app か PowerShell を開き、次のコマンドを実行して、Yarn をインストールします。

   ```sh
   npm install --global yarn
   ```

1. さらに次のコマンドを実行して、正しくインストールされたか確認します。

   ```sh
   yarn -v
   ```

   何かしらのバージョンが表示されれば OK です。

## サンプルコードの実行

1. このリポジトリをクローンします。もしクローンする方法がわからない場合は、[ここから Zip を直接ダウンロード](https://github.com/shotamatsuda/ut-lecture-2024/archive/refs/heads/main.zip)し、適当な場所に展開してください。

1. Terminal.app か PowerShell を開き、クローンした場所、あるいは Zip を展開した場所へ `cd` し、`yarn` を実行します。

   ```sh
   cd ut-lecture-2024
   yarn
   ```

   しばらく経った後に、`Done with warnings in Xs XXXms` と表示されれば OK です。

1. さらに、次のコマンドを実行し、Three.js のサンプルコードを実行します。

   ```sh
   yarn nx serve three
   ```

1. ウェブブラウザで http://127.0.0.1:4200 (http://localhost:4200) を開き、PLATEAU 3D 都市モデルが表示されれば OK です。
   左右ボタンのドラッグや修飾キーを使って、カメラの移動をします。

   ![image](https://github.com/shotamatsuda/ut-lecture-2024/assets/8651513/6a4ae10f-2802-481f-8087-e67878451aed)

1. 最後に次のコマンドも実行し、Three.js のサンプルコードと同様に表示を確認してください。実行する前に、前のプロセスを Kill してください。

   ```sh
   yarn nx serve cesium
   ```

   ```sh
   yarn nx serve deck
   ```

   ```sh
   yarn nx serve react
   ```

   ![image](https://github.com/shotamatsuda/ut-lecture-2024/assets/8651513/d298ca7a-58bf-4942-9962-3362c785fda7)

   ![image](https://github.com/shotamatsuda/ut-lecture-2024/assets/8651513/018fc0fe-af8f-4398-ad18-1fdacb875cd2)

   ![image](https://github.com/shotamatsuda/ut-lecture-2024/assets/8651513/3f3ac210-eaef-4800-8b72-633a22e8b285)
