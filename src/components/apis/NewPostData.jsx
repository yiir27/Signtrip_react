import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NewPostData = async (data, image, token, statusPlace) => {
    //コンポート内で利用可。ですが外部関数では利用不可のため引数として渡すことが必要
    const navigate = useNavigate();
    const formData = new FormData();
    if(image){
        formData.append("image_url",image)
    }
    formData.append("category_id",data.category_id);
    formData.append("tripTitle", data.tripTitle);
    formData.append("status", statusPlace); //'公開'状態を示すstatusを追加   

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
