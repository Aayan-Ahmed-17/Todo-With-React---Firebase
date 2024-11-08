// import React, { useEffect, useRef } from "react";
// // import {render} from '@te'
// import { auth, db } from "../configs/firebaseConfig";
// import { collection, addDoc, where, query,  getDocs } from "firebase/firestore";

// const AddTodo = ({
//   todoInput,
//   setTodo,
//   todo,
//   setShowCompo,
//   name,
//   buttonText,
//   inputVal,
// }) => {
  
//   //* push data firestore
//   async function insertDataToFireStore() {
//     if ((todoInput.current.value).trim()) {
//       const val = (todoInput.current.value).trim()
//       try {
//         const docRef = await addDoc(collection(db, "todo"), {
//           title: val,
//           user: auth.currentUser.uid,
//         });

//         //pushing vals in todo array || clear input field when open again | change state for hide newTodo compo
//         todo.push({
//           title: todoInput.current.value,
//           uid: auth.currentUser.uid,
//           docid: docRef.id
//         })
//         setTodo([...todo])
//         console.log(todo)
//         todoInput.current.value = "";
//         setShowCompo(false);

//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     }
//   }
  


//   //* edit text of a todo

//   // async function editDataInFireStore(item, index) {
//   //   if (todoInput.current.value) {
//   //     try {

//   //     } catch (e) {
//   //       console.error("Error adding document: ", e);
//   //     }
//   //   }
//   // }

//   // const editDataInFireStore = async (item, index) => {
//     // const updatedVal = todoInput.current.value;
//     // const washingtonRef = doc(db, "todo", item.docid);
//     // await updateDoc(washingtonRef, {
//     // title: updatedVal
//     // });
//     // todo[index].title = updatedVal;
//     // setTodo([...todo]);

//     // console.log("todo updated");
//     // console.log(todoInput.current.value);
//     // console.log(updatedVal);
//   // };

//   return (
//     <div className="max-w-96 min-h-72 mx-auto grid border-2 border-slate-500 rounded-xl mt-16">
//       <div className="grid max-h-24">
//         <h2 className="card-title mx-auto">{name}</h2>
//         <input
//           id="todo-value"
//           type="text"
//           placeholder="Enter Task Here"
//           className="input input-bordered w-4/5 max-h-8 mx-auto"
//           maxLength={50}
//           ref={todoInput}
//           defaultValue={inputVal}
//         />
//       </div>
//       <div className="w-4/5 self-end flex justify-between mx-auto mb-2">
//         <button
//           onClick={() => setShowCompo(false)}
//           className="bg-[#F7F7F7] text-[#6C63FF] rounded-sm justify-self-end py-1 px-4 text-md box-content border-[1px] border-[#6C63FF]"
//         >
//           Cancel
//         </button>
//         <button
//           className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-1 px-4 text-md box-content"
//           onClick={() =>
//             buttonText === "Save"
//               ? editDataInFireStore(inputVal)
//               : insertDataToFireStore()
//           }
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// };
// export default AddTodo;
