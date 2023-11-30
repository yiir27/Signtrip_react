import React from 'react'
import { useNavigate } from 'react-router-dom'

const NewPostButton = () => {
    const navigate = useNavigate();

    const handleNewPostClick = () => {
        navigate(`/users/NewPost/post`);
    };

    const buttonStyle = {
        position: "fixed",
        right: "40px",
        bottom: "80px",
    };

    const buttonStylePC = {
        position: "fixed",
        right: "calc(50% - 250px + 40px)", //500pxの中央から
        bottom: "80px",
    };

  return (
    <>
        
    </>
  )
}

export default NewPostButton