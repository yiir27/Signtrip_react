import axios from "axios"; // HTTPクライアント
import Cookies from "js-cookie"; // Cookie管理ライブラリ
import { useEffect, useState } from "react"; // React Hook

// 保護されたルートのテストコンポーネント
const ProtectedRouteTest = () => {
  // サーバーからのメッセージを表示するための状態変数
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Cookieからトークンを取得
    const token = Cookies.get("token");

    if (token) {
      // トークンが存在する場合、サーバーにトークンを含めてGETリクエストを送信
      axios
        .get("http://localhost/api/test", {
          headers: {
            Authorization: `Bearer ${token}`, // トークンをAuthorizationヘッダーに設定
          },
        })
        .then((response) => {
          setMessage(response.data.message); // サーバーからのレスポンスメッセージを表示
        })
        .catch((error) => {
          console.log(error);
          setMessage("失敗しました"); // エラー時のメッセージを表示
        });
    } else {
      setMessage("tokenがありません"); // トークンが存在しない場合のメッセージを表示
    }
  }, []); // コンポーネントの初期化時にのみ実行

  // コンポーネントのレンダリング
  return (
    <div>
      <h1>保護されたルートのテスト</h1>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedRouteTest;