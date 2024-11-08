import React from 'react'

const TodoItem = ({ todo, onEdit, onDelete }) => (
    <li className="border-b-2 leading-6 py-2 flex justify-between group px-2">
      <label className="flex items-center w-full">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 peer"
        />
        <span className="ml-2 peer-checked:line-through peer-checked:text-slate-500">
          {todo.title}
        </span>
      </label>
      <div className="hidden group-hover:flex gap-2">
        <button
          onClick={() => onEdit(todo)}
          className="bg-[#ffc30d] hover:bg-[#daa70f] text-xs py-1 px-2 rounded-md"
        >
          EDIT
        </button>
        <button
          onClick={() => onDelete(todo.docid)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded-md"
        >
          DELETE
        </button>
      </div>
    </li>
  );

export default TodoItem
