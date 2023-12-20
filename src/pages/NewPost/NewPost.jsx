import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import styles from './NewPost.module.scss';

const NewPost = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }   
    } = useForm({ mode: 'onSubmit',});
    const navigate = useNavigate();
    const token = Cookies.get('token');

    //カテゴリ一覧
    const [categories, setCategories] = useState([]);
    // const { 
    //     fields,
    //     append: appendRoutes,
    //     remove,
    // } = useFieldArray({
    //     control,
    //     name: "routes",
    // });
 
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
        const mainFile = event.target.files[0];
        setImage(mainFile);
    }

    const [routeImage, setRouteImage] = useState(null);
    const onRouteImage = event => {
        const routeFile = event.target.files[0];
        setRouteImage(routeFile);
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        if(image){
            formData.append("image_url",image)
        }
        formData.append("category_id",data.category_id);
        formData.append("tripTitle", data.tripTitle);

        formData.append('title', data.title);
        formData.append('text', data.text);
        if(routeImage) {
            formData.append('routes_image_url', routeImage);
        }

        formData.append("tripStatus", data.tripStatus);
        formData.append("RouteStatus", data.RouteStatus);

        
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
            if (response.status === 201) {
                //フォーム送信成功時の処理
                navigate("/home");
            } else {
                //エラーハンドリング
                console.error("Failed to create post");
            }
            // console.log(formData);
            console.log(response.status);
        } catch (error) {
            console.log("Failed to create post", error);
        }
    }

    const handleDraft = () => {
        handleSubmit( data => {
            data.tripStatus = 2;
            data.RouteStatus = 2;
            onSubmit(data);
        })();
    }

    const handlePublish = () => {
        handleSubmit( data => {
            data.tripStatus = 1;
            data.RouteStatus = 1;
            onSubmit(data);
            alert('OK');
        })();
    }


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
            <div className={styles["form__field"]}>
                <label className={styles["form__label"]}>ルート</label>
            </div>
            <div className={styles["form__field"]}>
                <label htmlFor="image" className={styles["form__label"]}>
                    画像をアップロード
                </label>
                <input type="file" id='route_image' accept='image/*' onChange={onRouteImage} className={styles["form__input"]}/>
                {/* 画像があるなら表示させる */}
                {routeImage && (
                    <img 
                        src={URL.createObjectURL(routeImage)}
                        alt="投稿画像"
                        className={styles["form__image"]}
                    />
                )}
            </div>
            <div className={styles["form__field"]}>
                <label htmlFor="title" className={styles["form__label"]}>タイトル</label>
                <input
                    id='title' type='text' name='title'
                    className={styles["form__input"]}
                    {...register('title')}
                />
            </div>
            <div className={styles["form__field"]}>
                <label htmlFor="text" className={styles["form__label"]}>詳細</label>
                <textarea
                    id='text' name='text'
                    {...register('text')}
                    className={styles["form__textarea"]}
                />
                {/* <button type='button' onClick={() => setShowRouteForm}></button> */}
            </div>

            <div className={styles["form__buttonfield"]}>
                <button type='submit'
                 onClick={handlePublish}
                 name='action'
                 value='publish'
                 className={styles["form__submit-publishButton"]}>
                    投稿する
                </button>
                <button type='submit'
                 onClick={handleDraft}
                 name='action'
                 value='draft'
                 className={styles["form__submit-draftButton"]}>
                    下書き保存
                </button>
            </div>
        </form>
    </>
  )
}

export default NewPost