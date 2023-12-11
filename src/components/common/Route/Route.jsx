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

    


  return (
    <div>Route</div>
  )
}

export default Route