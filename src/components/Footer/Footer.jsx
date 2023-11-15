import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./Footer.module.scss";
import {TbHome , TbSearch, TbCirclePlus, TbStars, TbMoodNerd } from "react-icons/tb";

const Footer = () => {
    //ナビゲーション関数を取得
    const navigate = useNavigate();
    //現在のロケーションを取得
    const location = useLocation();

    //アイコンのクリック時のハンドラ関数。指定されたパスに遷移する
    //追加のロジックがある場合はLinkではなくイベントを使う
    const handleIconClick = (path) => {
        navigate(path);
    };

    if(location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

  return (
    <div className={styles.footerStyle}>
        <div className={styles["icon-container"]}>
            <TbHome
                size="1.5rem"
                onClick = {() => handleIconClick("/home")}
                className={styles["icon-container__icon"]}
            />
            <p className={styles["icon-container__label"]}>ホーム</p>
        </div>
        <div className={styles["icon-container"]}>
            <TbSearch
                size="1.5rem"
                // onClick = {() => handleIconClick("")}
                className={styles["icon-container__icon"]}
            />
            <p className={styles["icon-container__label"]}>検索</p>
        </div>
        <div className={styles["icon-container"]}>
            <TbCirclePlus
                size="1.5rem"
                onClick = {() => handleIconClick("/home/newPost")}
                className={styles["icon-container__icon"]}
            />
            <p className={styles["icon-container__label"]}>投稿</p>
        </div>
        <div className={styles["icon-container"]}>
            <TbStars
                size="1.5rem"
                // onClick = {() => handleIconClick("")}
                className={styles["icon-container__icon"]}
            />
            <p className={styles["icon-container__label"]}>お気に入り</p>
        </div>
        <div className={styles["icon-container"]}>
            <TbMoodNerd
                size="1.5rem"
                // onClick = {() => handleIconClick("")}
                className={styles["icon-container__icon"]}
            />
            <p className={styles["icon-container__label"]}>マイページ</p>
        </div>
    </div>
  );
}

export default Footer