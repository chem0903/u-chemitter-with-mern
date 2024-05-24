## 画像ファイルの扱いについて

```jsx
const App = () => {
  return <img src="./asset/person/1.jpeg" alt="" className="postProfileImg" />;
};
```

このコンポーネントがレンダリングされると、以下のような一連のステップが発生します：

1. JSX のコンパイルと DOM の更新

- JSX が React によって JavaScript の関数呼び出しにコンパイルされ、仮想 DOM に対応するエントリが作成されます。
- 仮想 DOM の変化が検出され、実際の DOM が更新されます。この場合、<img>タグが作成され、src 属性が設定されます。

2. 画像の取得リクエストの発行

- ブラウザが新しい<img>タグを DOM に追加すると、src 属性に指定された URL に対して HTTP リクエストが発行されます。
- src="./asset/person/1.jpeg"の場合、ブラウザは相対パスに基づいて画像を取得しようとします。この相対パスは、ページが読み込まれている URL を基準に解釈されます。

3. HTTP リクエストの送信

- 例えば、ページが http://localhost:3000/で提供されているとすると、ブラウザは http://localhost:3000/asset/person/1.jpeg に対して GET リクエストを送信します。

4. サーバーのレスポンス

- サーバーはリクエストを受け取り、指定されたパスにあるファイルをクライアントに返します。存在するファイルであれば、HTTP 200 レスポンスと共に画像データが返されます。

5. 画像の表示

- ブラウザはレスポンスを受け取り、画像データをレンダリングして表示します。

6. エラー処理

- もし画像ファイルが存在しない場合、サーバーは HTTP 404 レスポンスを返します。
- ブラウザはこのエラーレスポンスを受け取り、alt 属性のテキストや適切なエラーメッセージを表示する場合があります。

## 絶対パスと相対パス

# 絶対パス

絶対パスは、ファイルやリソースの位置をファイルシステムや URL のルートから完全に指定する方法です（**パスは「/api」から始まる**）。
絶対パスは、システムのルートディレクトリ（またはウェブサーバーのルート）から始まるため、一意にリソースの位置を特定できます。

例:

ファイルシステムの場合: **ルートディレクトリから指定する**

- Unix 系システム（Linux、macOS）: /home/user/documents/file.txt
- Windows: C:\Users\user\documents\file.txt

URL の場合: **https から指定する**

- https://example.com/assets/images/picture.jpg

# 相対パス

相対パスは、現在のディレクトリや現在の URL を基準にしてリソースの位置を指定する方法です。相対パスは、基準となる場所に対する相対的な位置を示します（**パスは「./api」または「api」から始まる**）。

例:

ファイルシステムの場合:

- 現在のディレクトリが/home/user の場合、documents/file.txt や../user2/file.txt や./user2/file.txt が相対パスとなります。

URL の場合:

- /assets/images/picture.jpg（ドメインに対する相対パス）または ./assets/images/picture.jpg や ../images/picture.jpg（現在のURLに対する相対パス）が相対パスとなります。

# 相対パスを絶対パスで表すと

ファイルシステムの場合

例 1:

- 現在のディレクトリ /home/user
- 相対パス ./documents/file.txt
- **絶対パス /home/user/documents/file.txt**
  （すなわち、「. = /home/user」）

例 2:

- 現在のディレクトリ /home/user
- 相対パス documents/file.txt
- **絶対パス /home/user/documents/file.txt**
  （documents/file.txt は ./ が省略されていると考える）

例 3:

- 現在のディレクトリ /home/user
- 相対パス ../user2/file.txt
- **絶対パス /home/user2/file.txt**
  （すなわち、「.. = /home」）

URL の場合

例 4:

- 現在の URL https://example.com/page/user

- 相対パス1で指定 ./images/picture.jpg
- **実際の URL https://example.com/page/user/images/picture.jpg**
  （すなわち、「. = https://example.com/page/user」）

- 相対パス2で指定 /images/picture.jpg
- **実際の URL https://example.com/images/picture.jpg**
  
例 5:

- 現在の URL https://example.com/page/user

- 相対パス1で指定 ../images/picture.jpg
- **実際の URL https://example.com/page/images/picture.jpg**
  （すなわち、「.. = https://example.com/page」）

- 相対パス2で指定 /images/picture.jpg
- **実際の URL https://example.com/images/picture.jpg**
  （http からすべてのパスを記述してもよい。絶対パスで指定 https://example.com/images/picture.jpg）

# プロキシ設定

```js
axios.post("/tasks", { name: inputedCreatedTaskNameByClient }); 
```

というリクエストでは、プロキシ設定によって /task より前のパスが決まります。

たとえば、package.jsonに次のようなプロキシ設定がある場合：

```json
{
  "proxy": "https://u-chemitter-with-mern-in-backend.onrender.com"
}
```

この場合、リクエストは次のようになります：

POST https://u-chemitter-with-mern-in-backend.onrender.com/tasks

**プロキシ設定がない場合は、デフォルトで同じオリジン（フロントエンドがホストされている場所）にリクエストが送信されます。**