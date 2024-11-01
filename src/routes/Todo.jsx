import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";

const Todo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid)
        navigate('/product')
      } else {
        navigate('/login')
      }
    });
  }, [])

  // function productDetailPage(item) {
  //   navigate(`${item.id}`);
  // }
  
  return (
    < >
      
    </>
  );
};



export default Todo;
