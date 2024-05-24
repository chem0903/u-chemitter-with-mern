// ユーザー入力に応じた、アクションの設定

export const LoginStart = (user) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginError = (err) => ({
  type: "LOGIN_ERROR",
  payload: error,
});
