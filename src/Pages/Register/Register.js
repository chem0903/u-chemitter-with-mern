import React, { useRef } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SEVER_API = process.env.REACT_APP_SEVER_API;

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // パスワードと確認用パスワードが一致しているか
    if (password.current.value === passwordConfirmation.current.value) {
      try {
        await axios.post(`${SEVER_API}/auth/register`, {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        });
      } catch (err) {
        console.log(err);
      }
      navigate("/login");
    } else {
      // 標準メソッド。結果は見たほうが早い
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">CHEMITTER</h3>
          <span className="loginDescription">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form
            className="loginBox"
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <p className="loginMessage">新規登録はこちらから</p>
            <input type="text" className="loginInput" placeholder="ユーザー名" required ref={username} />
            <input type="email" className="loginInput" placeholder="Eメール" required ref={email} />
            <input type="password" className="loginInput" placeholder="パスワード" required minLength="6" ref={password} />
            <input type="password" className="loginInput" placeholder="確認用パスワード" required minLength="6" ref={passwordConfirmation} />
            <button className="loginButton" type="submit">
              サインアップ
            </button>
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              <button className="loginRegisterButton">ログイン</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
