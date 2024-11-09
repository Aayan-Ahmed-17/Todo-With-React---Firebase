import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../configs/firebaseConfig";

// pages/TodoPage.jsx
const TodoPage = () => {
  const [todos, setTodos] = useState([]); //All todo Array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("add"); // 'view', 'add', 'edit'
  const [currentTodo, setCurrentTodo] = useState(null); //Selected to array

  //* For User Authn
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        navigate("/todo");
        fetchTodos();
      } else {
        navigate("/login");
      }
    });
  }, []);

  const fetchTodos = async () => {
    try {
      const q = query(
        collection(db, "todo"),
        where("user", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedTodos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docid: doc.id,
      }));
      setTodos(fetchedTodos);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  //* Add Todo
  const handleAddTodo = async (todoText) => {
    setIsLoading(true);
    try {
      //* add data to firestore
      const docRef = await addDoc(collection(db, "todo"), {
        title: todoText,
        user: auth.currentUser.uid,
      });

      //* add todo to the local variable
      const newTodo = {
        title: todoText,
        user: auth.currentUser.uid,
        docid: docRef.id,
      };

      setTodos((prev) => [...prev, newTodo]);
      setMode("view");
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  //* Edit Todo
  const handleUpdateTodo = async (todoText) => {
    setIsLoading(true);
    try {
      //* edit in firestore
      const todoRef = doc(db, "todo", currentTodo.docid);
      await updateDoc(todoRef, {
        title: todoText,
      });


      setTodos((prev) =>
        prev.map((todo) =>
          todo.docid === currentTodo.docid
            ? { ...todo, title: todoText }
            : todo
        )
      );
      setMode("view");
      setCurrentTodo(null);
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId) => {

    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "todo", todoId));
      setTodos((prev) => prev.filter((todo) => todo.docid !== todoId));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setMode("edit");
  };

  const handleCancel = () => {
    setMode("view");
    setCurrentTodo(null);
    setError(null);
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error}
        <button onClick={fetchTodos} className="ml-4 text-blue-500 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {mode === "view" ? (
        <div className="w-3/4 mx-auto grid">
          <TodoList
            todos={todos}
            onEdit={handleEdit}
            onDelete={handleDeleteTodo}
          />
          <button
            onClick={() => setMode("add")}
            className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-2 px-4 text-2xl box-content mt-4 max-w-6"
          >
            +
          </button>
        </div>
      ) : (
        <TodoForm
          onSubmit={mode === "add" ? handleAddTodo : handleUpdateTodo}
          initialValue={currentTodo?.title || ""}
          mode={mode}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default TodoPage;
