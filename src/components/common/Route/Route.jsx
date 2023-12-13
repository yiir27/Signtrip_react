import Cookies from 'js-cookie';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const Route = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onSubmit' });
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [image, setImage] = useState(null);
    
    const onImage = event => {
        const file = event.target.files[0];
        setImage(file);
    }

    const onSubmit = async (data) => {
        const formData = new FormData();
        if(image) {
            formData.append("image_url", image)
        }
        formData.append('title', data.title);
        formData.append('text', data.text);

        try {
            const response = await axios.post(
                `http://localhost/api/users/home/newPost`,
            )
        } catch(error) {
            console.log(error);
        }
    }

  return (
    <>
        
    </>
  )
}

export default Route