import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../configs/firebaseConfig";
// importing to get the data from collection
import { where, query, collection, getDocs } from "firebase/firestore";
import AddTodo from "../components/AddTodo";

const Todo = () => {
  /************* Tasks *******************
   * enter todo field and get value
   * show to in a list
   * create todo button
   * edit and del todo
   */
  const todoInput = useRef();
  const [todo, setTodo] = useState([]);
  const [show, setShow] = useState(true);
  const [checkedItem, setCheckedItem] = useState(false);

  const navigate = useNavigate();

  // for authn check if user login or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate("/todo");
        getDataFromFireStore()
      } else {
        navigate("/login");
      }
    });
  }, []);

    //* to get data with an id
    async function getDataFromFireStore() {
      try {
        // if (auth.currentUser.uid) {
          const q = query(
            collection(db, "todo"),
            where("user", "==", auth.currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const tempTodoArr = [];
          querySnapshot.forEach((doc) => {
            tempTodoArr.push(doc.data().title);
          });
          setTodo(tempTodoArr);
      } catch (error) {
        console.warn(error);
      }
    }

  function showCompo() {
    setShow(!show);
  }

  function handleCheckox() {
    setCheckedItem(!checkedItem);
  }

  return (
    <>
      {show && (
        <AddTodo
          todoInput={todoInput}
          todo={todo}
          setTodo={setTodo}
          setShow={setShow}
          show={show}
        />
      )}
      {!show && (
        <div className="grid w-4/5  mx-auto">
          <div>
            <h2 className="text-center font-semibold text-2xl mt-12">
              TODO LIST
            </h2>

            {todo && (
              <ul className="grid gap-2 w-4/5 mx-auto px-4 mt-3">
                {todo.map((e, i) => (
                  <li key={i} className="border-b-2 leading-6 py-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name={`task${i + 1}`}
                        onChange={handleCheckox}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />

                      {checkedItem ? (
                        <span className="ml-2 line-through">{e}</span>
                      ) : (
                        <span className="ml-2">{e}</span>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={showCompo}
            className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-2 px-4 text-2xl box-content mt-10"
          >
            +
          </button>
        </div>
      )}
    </>
  );
};

export default Todo;
