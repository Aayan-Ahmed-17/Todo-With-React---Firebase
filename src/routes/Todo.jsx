import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import AddTodo from "../components/AddTodo";

const Todo = () => {
  /************* Tasks *******************
   * enter todo field and get value
   * show to in a list
   * create todo button
   * edit and del todo
   */
  const todoInput = useRef();
  const [todo, setTodo] = useState("");
  const [show, setShow] = useState(true)

  const navigate = useNavigate();

  // for authn check if user login or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        navigate("/todo");
      } else {
        navigate("/login");
      }
    });
  }, []);

  function showCompo(){
    setShow(!show)
  }


  return (
    <>
        {show && <AddTodo todoInput={todoInput} todo={todo} setTodo={setTodo} setShow={setShow} show={show}/>}
      {!show && <div className="grid w-4/5  mx-auto">
        <div>
          <h2 className="text-center font-semibold text-2xl mt-12">
            TODO LIST
          </h2>

          {todo && (
            <ul className="grid gap-2 w-4/5 mx-auto px-4 mt-3">
              {todo.map((e , i) =>
              <li className="border-b-2 leading-6 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name={`task${i + 1}`}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">{e}</span>
                </label>
              </li>
              )}
            </ul>
          )}
        </div>
        <button onClick={showCompo} className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-2 px-4 text-2xl box-content mt-10">
          +
        </button>
      </div>}
    </>
  );
};

export default Todo;
