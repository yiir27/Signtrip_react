import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss';


const Home = () => {
  //投稿データを管理するためのステート
  const [trips, setTrips] = useState([]);
  //ローディングの表示（初期値は読み込み中が出る）
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get('token');

  useEffect(() => {
    //マウント時にAPIから投稿データを取得する
    axios.get(`http://localhost/api/home`,{
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
         .then((response) => {
          //データを取得できたらstateを更新
          setTrips(response.data);
          //ロード中を解除
          setIsLoading(false);
         })
         .catch((error) => {
          console.error('データの取得に失敗しました',error);
          setIsLoading(false);
         });
  },[]);//このEffectはマウント時にのみ実行されるので、空配列を持たせる
  console.log(trips);

  if(isLoading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div className={styles["home-list"]}>      
        {trips.length === 0 ? (
          <p>投稿はありません</p>
        ) : (
          <ul>
            {trips
                  .filter(trip => trip.status === 1) //status１のみフィルタリング
                  .sort((a, b) => b.id - a.id)
                  .map((trip) => (
                    <li key={trip.id} className={styles["home-list__item"]}>
                      {trip.image_url && (
                        <img src={`http://localhost/storage/${trip.image_url}`} 
                            alt="アイテム画像"
                            className={styles["home-list__image"]}
                            loading='lazy' />
                      )}
                      <Link to={`/home/${trip.id}`}>
                        <p className={styles["home-list__title"]}>{trip.tripTitle}</p>
                      </Link>
                    </li>
                  ))}
          </ul>
        )}
      </div> 
    </>
  );
};

export default Home;