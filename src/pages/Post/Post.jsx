import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Post = () => {
    //URLからitem_idを取得
    const { trip_id } = useParams();
    //取得したデータの保持
    const [tripData, setTripData] = useState(null);
    //CookieからログインユーザーのIDを取得
    const loggedInUserId = parseInt(Cookies.get("user_id"));

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    //マウント時、指定したtrip_idをもとにAPIから投稿データを取得してitemDataにセット
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/api/home/${trip_id}`);
                const responseData = response.data;
                setItemData(responseData);
                setIsLoading(false);
            } catch (error) {
                console.error("データの取得に失敗しました", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [trip_id]);


  return (
    <>
        <h2>{tripData.tripTitle}</h2>
        <div>
            {tripData.image_url && (
                <img src={`http://localhost/${tripData.image_url}`}
                     alt="メイン画像" />
            )}
        </div>
    </>
  )
}

export default Post