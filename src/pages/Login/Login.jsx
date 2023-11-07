import {} from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  //ページ遷移や遷移先に値を渡すことが可能になるAPI
  const navigate = useNavigate();
  //環境変数からAPIのベースURLを取得
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${baseURL}/api/login`, data)
      .then((response) => {
        console.log(response.data);
        // サーバーからのレスポンスデータからトークンを抽出
        const receivedToken = response.data.token;
        const receivedId = response.data.user.id;

        // トークンを変数に格納
        const token = receivedToken;
        const user_id = receivedId;

        // トークンをコンソールに表示（確認用）
        console.log(token, user_id);

        // トークンをクッキーに保存
        Cookies.set("token", token, { expires: 7 }); // 有効期限を設定
        Cookies.set("user_id", user_id, { expires: 7 }); // 有効期限を設定
        setErrorMessage("");
        navigate("/posts");
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage("ログインに失敗");
        }
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          {...register("email", { required: "Emailは必須です" })}
        />
        <p>{errors.email ? errors.email.message : null}</p>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "パスワードは必須です",
            minLength: { value: 8, message: "8文字以上で入力してください" },
          })}
        />
        <p>{errors.password ? errors.password.message : null}</p>

        <button type="submit">送信</button>
      </form>
    </div>
  );
}


export default Login