## 画像ファイルの扱いについて

```jsx
const App = () => {
    return (
        <img src="./asset/person/1.jpeg" alt="" className="postProfileImg" />
    )
}
```

このコンポーネントがレンダリングされると、以下のような一連のステップが発生します：

1. JSXのコンパイルとDOMの更新

- JSXがReactによってJavaScriptの関数呼び出しにコンパイルされ、仮想DOMに対応するエントリが作成されます。
- 仮想DOMの変化が検出され、実際のDOMが更新されます。この場合、<img>タグが作成され、src属性が設定されます。

2. 画像の取得リクエストの発行

- ブラウザが新しい<img>タグをDOMに追加すると、src属性に指定されたURLに対してHTTPリクエストが発行されます。
- src="./asset/person/1.jpeg"の場合、ブラウザは相対パスに基づいて画像を取得しようとします。この相対パスは、ページが読み込まれているURLを基準に解釈されます。

3. HTTPリクエストの送信

- 例えば、ページがhttp://localhost:3000/で提供されているとすると、ブラウザはhttp://localhost:3000/asset/person/1.jpegに対してGETリクエストを送信します。

4. サーバーのレスポンス

- サーバーはリクエストを受け取り、指定されたパスにあるファイルをクライアントに返します。存在するファイルであれば、HTTP 200レスポンスと共に画像データが返されます。

5. 画像の表示

- ブラウザはレスポンスを受け取り、画像データをレンダリングして表示します。

6. エラー処理

- もし画像ファイルが存在しない場合、サーバーはHTTP 404レスポンスを返します。
- ブラウザはこのエラーレスポンスを受け取り、alt属性のテキストや適切なエラーメッセージを表示する場合があります。

## 絶対パスと相対パス

# 絶対パス

絶対パスは、ファイルやリソースの位置をファイルシステムやURLのルートから完全に指定する方法です。
絶対パスは、システムのルートディレクトリ（またはウェブサーバーのルート）から始まるため、一意にリソースの位置を特定できます。

例:

ファイルシステムの場合:
- Unix系システム（Linux、macOS）: /home/user/documents/file.txt
- Windows: C:\Users\user\documents\file.txt

URLの場合:
- https://example.com/assets/images/picture.jpg

# 相対パス

相対パスは、現在のディレクトリや現在のURLを基準にしてリソースの位置を指定する方法です。相対パスは、基準となる場所に対する相対的な位置を示します。

例:

ファイルシステムの場合:
- 現在のディレクトリが/home/userの場合、documents/file.txtや../user2/file.txtが相対パスとなります。

URLの場合:
- 現在のURLがhttps://example.com/pageの場合、./assets/images/picture.jpgや../images/picture.jpgが相対パスとなります。

# 相対パスを絶対パスで表すと

例 1:
現在のディレクトリ /home/user
相対パス ./documents/file.txt
**絶対パス /home/user/documents/file.txt**
（すなわち、「. = /home/user」）

例 2:
現在のディレクトリ /home/user
相対パス documents/file.txt
**絶対パス /home/user/documents/file.txt**
（documents/file.txt は ./ が省略されていると考える）

例 3:
現在のディレクトリ /home/user
相対パス ../user2/file.txt
**絶対パス /home/user2/file.txt**
（すなわち、「.. = /home」）

例 4:
現在のURL https://example.com/page
相対パス ./assets/images/picture.jpg
**絶対パス https://example.com/page/assets/images/picture.jpg**
（すなわち、「. = https://example.com/page」）

例 5:
現在のURL https://example.com/page
相対パス ../images/picture.jpg
**絶対パス https://example.com/images/picture.jpg**
（すなわち、「.. = https://example.com」）