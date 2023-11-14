import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

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
        formData.append("title, data.title");    

        try {
            const response = await axios.post(
                `http://localhost/api/users/home/new`,
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
            console.log(fromData);
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="image">画像をアップロード</label>
                <input id="image" type="file" accept='image/*' onChange={onImage}/>
                {/* 画像があるなら表示させる */}
                {image && (
                    <img 
                        src={URL.createObjectURL(image)}
                        alt="投稿画像" />
                )}
            </div>
            <div>
                <label htmlFor='category_id'>カテゴリ</label>
                <select
                    id='category_id'
                    name='category_id'
                    { ...register("category_id", {required: "カテゴリーを選択してください",})}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='tripTitle'>タイトル</label>
                <input id="tripTitle" type="text" name='tripTitle'
                    {...register("tripTitle", {required: "タイトルは必須です"})}/>
                <p>{errors.tripTitle ? errors.tripTitle.message : null}</p>
            </div>
        </form>
    </>
  )
}

export default NewPost