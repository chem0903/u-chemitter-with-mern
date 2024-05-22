import React from "react";
import "./Register.css";

const Register = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Real SNS</h3>
                    <span className="loginDescription">本格的なSNSを、自分の手で。</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <p className="loginMessage">新規登録はこちらから</p>
                        <input type="text" className="loginInput" placeholder="ユーザー名" />
                        <input type="text" className="loginInput" placeholder="Eメール" />
                        <input type="text" className="loginInput" placeholder="パスワード" />
                        <input type="text" className="loginInput" placeholder="確認用パスワード" />
                        <button className="loginButton">サインアップ</button>
                        <button className="loginRegisterButton">ログイン</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;