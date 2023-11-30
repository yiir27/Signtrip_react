import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import styles from './NewPost.module.scss';

const NewPost = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }   
    } = useForm({ mode: 'onSubmit'});
    const navigate = useNavigate();
    const token = Cookies.get('token');

    //カテゴリ一覧
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        
        const fetchCategories = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };        
                const response = await axios.get('http://localhost/api/categories', { headers: headers});
                setCategories(response.data);
                     console.log(response.data)
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };
        fetchCategories();
    },[]);
    //アップロードされる画像のファイル情報
    const [image, setImage] = useState(null);
    //アップロードの画像
    const onImage = (event) => {
        const file = event.target.files[0];
        setImage(file);
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        if(image){
            formData.append("image_url",image)
        }
        formData.append("category_id",data.category_id);
        formData.append("tripTitle", data.tripTitle);
        // formData.append("status", statusPlace); //'公開'状態を示すstatusを追加   

        try {
            const response = await axios.post(
                `http://localhost/api/users/home/newPost`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status === 200) {
                //フォーム送信成功時の処理
                console.log("Post created successfully");
                navigate("/home");
            } else {
                //エラーハンドリング
                console.error("Failed to create post");
            }
            console.log(formData);
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    }


    
    // const onSubmit = async (data, status) => {
    //     await NewPostData(data, image, token, status, navigate);
    // };


  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
            <div className={styles["form__field"]}>
                <label htmlFor="image" className={styles["form__label"]}>
                    画像をアップロード
                </label>
                <input type="file" id='image' accept='image/*' onChange={onImage} className={styles["form__input"]}/>
                {/* 画像があるなら表示させる */}
                {image && (
                    <img 
                        src={URL.createObjectURL(image)}
                        alt="投稿画像"
                        className={styles["form__image"]}
                    />
                )}
            </div>
            <div className={styles["form__field"]}>
                <label htmlFor='category_id' className={styles["form__label"]}>
                    カテゴリ
                </label>
                <select
                    id='category_id'
                    name='category_id'
                    className={styles["form__select"]}
                    { ...register("category_id", {required: "カテゴリーを選択して下さい"})}
                    defaultValue="">
                    <option value="" disabled>カテゴリーを選択して下さい</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category_id && <p>{errors.category_id.message}</p>}
            </div>
            <div className={styles["form__field"]}>
                <label htmlFor='tripTitle' className={styles["form__label"]}>
                    タイトル
                </label>
                <input id="tripTitle" type="text" name='tripTitle' className={styles["form__input"]}
                    {...register("tripTitle", {required: "タイトルは必須です"})}/>
                <p>{errors.tripTitle ? errors.tripTitle.message : null}</p>
            </div>
            <div className={styles["form__buttonfield"]}>
                {/* <button type='button'
                //  onClick={() => handleSubmit((data) => onSubmit(data, 'draft'))}
                 className={styles["form__submit-button"]}>
                    下書き保存
                </button> */}
                <button type='submit' 
                //  onClick={() => handleSubmit((data) => onSubmit(data, 'publish'))}
                 className={styles["form__submit-button"]}>
                    投稿する
                </button>
            </div>
        </form>
    </>
  )
}

export default NewPost