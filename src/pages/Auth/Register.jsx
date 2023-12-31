import {} from "react";
// import "../App.css"; //任意のcss
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


//react-hook-formのメソッドを使用
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit" });

  // "password" フィールドの値を監視しています。
  // watch メソッドは React Hook Form で提供されており、指定したフィールドの値を取得できます。
  const password = watch("password");

  // ここから先のコードで password 変数を使用してパスワードのバリデーションなどを行います。
  // この変数は "password" フィールドの値を取得するために利用します。
  const navigate = useNavigate(); //useNavigateを初期化

//入力データの送信
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost/api/register", data)
      .then((response) => {
        console.log(response.data);
        if(response.status === 204) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">nickname</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "名前は必須です",
            minLength: { value: 4, message: "4文字以上で入力してください" },
          })}
        />
        <p>{errors.name ? errors.name.message : null}</p>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
         {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "有効なEmailアドレスを入力してください",
            },
          })}
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
        <label htmlFor="password_confirmation">password（確認）</label>
        <input
          id="password_confirmation"
          type="password"
          {...register("password_confirmation", {
            required: "パスワード確認は必須です",
            validate: (value) =>
              value === password || "パスワードが一致しません",
          })}
        />
        <p>
          {errors.password_confirmation
            ? errors.password_confirmation.message
            : null}
        </p>

        <button type="submit">送信</button>
      </form>
      <div>
        ログインは
        <Link to="/login">こちら</Link>
      </div>
    </div>
  );
}



export default Register