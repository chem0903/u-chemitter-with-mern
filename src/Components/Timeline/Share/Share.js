import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import { AuthContext } from "../../../State/AuthContext";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const inputDOM = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputDOM.current.value) return;
    const newPost = { userId: user._id, description: inputDOM.current.value };

    if (file) {
      // データ（プロパティと値）をフィールドに格納することができるクラス。
      const fileData = new FormData();
      // file.nameが重複してしまう恐れがあるので、Dateクラスのnow()メソッドで日時を付与して一意の名前を作成。
      const fileName = Date.now() + file.name;
      // インスタンスメソッド append() によって、インスタンスフィールドにデータを格納。
      fileData.append("name", fileName);
      fileData.append("file", file);
      // fileData = { name: fileName, file: file } となっているイメージ。

      newPost.img = fileName;

      try {
        // 画像をbackendのpublic/imgフォルダに保存するためのリクエスト。
        await axios.post("https://u-chemitter-with-mern-in-backend.onrender.com/api/upload", fileData);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      // 投稿内容をデータベースに送信するためのリクエスト。
      await axios.post("https://u-chemitter-with-mern-in-backend.onrender.com/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : `${PUBLIC_FOLDER}/noAvatar.png`} alt="" className="shareProfileImg" />
          <input type="text" className="shareInput" placeholder="投稿" ref={inputDOM} />
        </div>
        <hr className="shareHr" />
        <form
          className="shareButtons"
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <div className="shareOptions">
            {/* label タグはinput要素（button, textarea, ...）と結びつけることが可能。jsxの場合は htmlFor="id" で結びつける（HTMLの場合は for="id"）。 */}
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              <input
                id="file"
                type="file" // file を選択することができる
                accept=".png, .jpeg, .jpg" // 受け入れ可能なファイルを指定
                style={{ display: "none" }} // 邪魔なので消す
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }} // ファイルが選択された（onChangeした）ときに発火。選択されたファイルの情報は上記のようにして取り出せる。
              />
              <p ckass="filename">{file?.name}</p>
            </label>
          </div>
          <button className="shareButton" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
