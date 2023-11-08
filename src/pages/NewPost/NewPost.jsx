import React from 'react'
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

  return (
    <button type='button' ></button>
  )
}

export default NewPost