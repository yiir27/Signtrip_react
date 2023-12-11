import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    //URLからitem_idを取得
    const { trip_id } = useParams();
    //取得したデータの保持
    const [tripData, setTripData] = useState({});
    //CookieからログインユーザーのIDを取得
    const loggedInUserId = parseInt(Cookies.get("user_id"));
    const token = Cookies.get("token");
    const [isLoading, setIsLoading] = useState(true);

    //マウント時、指定したtrip_idをもとにAPIから投稿データを取得してitemDataにセット
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/api/home/${trip_id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setTripData(response.data);
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
        <div>
            {tripData.image_url && (
                <img src={`http://localhost/storage/${tripData.image_url}`}
                     alt="メイン画像" />
            )}
            <h2>{tripData.tripTitle}</h2>
        </div>
    </>
  )
}

export default Post