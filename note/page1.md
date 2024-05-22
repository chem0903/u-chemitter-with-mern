## React の本質

# React のサーバーサイドについて
 
React のサーバー（ React を開発してくれた人用意したエンドポイント）は次のようなイメージになっている。

```js
const express = require('express');
const path = require('path');
const app = express();

// 'public'フォルダ内のファイルを静的ファイルとして提供
app.use(express.static(path.join(__dirname, 'public')));

// どのパスにアクセスしてもindex.htmlをレスポンスする
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

これにより、public フォルダの画像やテキストファイルなどにアクセスされると、そのファイルを返却し、
それ以外のパスにアクセスされると index.html を返却する。

# React の挙動

React で public フォルダの画像やテキストファイルなど以外のパスにアクセスすると、以下のような流れで通信が走る。

1. index.html にリダイレクトされ、index.htmlがレスポンスされる。

2. index.html に読み込まれている style.css および bundle.js（React の全ての jsx ファイルを一つにまとめたもの）を読み込むために再度サーバーにリクエストを送る。

3. style.css 及び bundle.js がブラウザで実行され index.html が書き換えられる（DOM 操作）

この DOM 操作で行われる具体的な処理

例 1: React-Router-Dom ライブラリを用いている場合
⇒　アクセスバーにヒストリーが追加される。その後、パス解析が行われて、それに基づいて DOM 操作が行われる（アクセスバーのパスが設定していないものの場合は、真っ白な画面を表示する）。

例 2: js ファイルに画像やテキスト、css ファイルが読み込まれている場合
⇒　再度サーバーにリクエストを送る。

4. その結果が出力される。

# React-router-dom をバニラ JS で記述すると（トランスパイルすると）

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about');
  };

  return (
    <div>
      <h2>Home</h2>
      <Link to="/about">
        <h1>Go to About h1</h1>
      </Link>
      <button onClick={goToAbout}>Go to About button</button>
    </div>
  );
};

const About = () => <h2>About</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
```

これをバニラ js にトランスパイルすると次のように記述できる

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanilla JS SPA</title>
</head>
<body>
    <nav>
        <a href="/" id="home-link" data-link>Home</a>
        <a href="/about" id="about-link" data-link>About</a>
    </nav>
    <div id="app"></div>

    <script src="app.js"></script>
</body>
</html>
```

```js
document.addEventListener('DOMContentLoaded', () => {
    const appDiv = document.getElementById('app');

    const routes = {
        '/': `<h2>Home</h2>
              <h1 id="goto-about-h1">Go to About h1</h1>
              <button id="goto-about-button">Go to About button</button>`,
        '/about': '<h2>About</h2>'
    };

    const navigateTo = (url) => {
        history.pushState(null, null, url);
        render(url);
    };

    const render = (url) => {
        appDiv.innerHTML = routes[url] || '<h2>404 Not Found</h2>';

        if (url === '/') {
            document.getElementById('goto-about-h1').addEventListener('click', () => {
                navigateTo('/about');
            });
            document.getElementById('goto-about-button').addEventListener('click', () => {
                navigateTo('/about');
            });
        }
    };

    window.addEventListener('popstate', () => {
        render(location.pathname);
    });

    document.getElementById('home-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/');
    });

    document.getElementById('about-link').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/about');
    });

    render(location.pathname);
});
```