import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Footer = () => {
    //ナビゲーション関数を取得
    const navigate = useNavigate();
    //現在のロケーションを取得
    const location = useLocation();
    const token = Cookies.get("token");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/api/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch(err) {
                setError("データの取得に失敗しました");
            }
        };
        fetchData();
    },[]);

    //アイコンのクリック時のハンドラ関数。指定されたパスに遷移する
    //追加のロジックがある場合はLinkではなくイベントを使う
    const handleIconClick = (path) => {
        navigate(path);
    };

    if(location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

  return (
    <div>Footer</div>
  )
}

export default Footer