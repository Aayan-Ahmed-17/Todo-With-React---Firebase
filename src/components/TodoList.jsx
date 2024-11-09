import React from 'react'
import TodoItem from './TodoItem';

const TodoList = ({ todos, onEdit, onDelete }) => {
    if (todos.length === 0) {
      return (
        <div className="text-2xl text-center text-gray-500 mt-8">
          No Data Found . . . . .
        </div>
      );
    }
  
    return (
      <>
        <h2 className="text-center font-semibold text-2xl my-8">TODO LIST</h2>
        <ul className="grid gap-2 w-4/5 mx-auto px-4 mt-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.docid} //* not a prop
              todo={todo} //* every single todo
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </>
    );
  };

export default TodoList
