import React from 'react';
import { FaTrash, FaPenToSquare } from 'react-icons/fa6';

type IProps = {
  title: string;
  status: string;
  id: number;
  onUpdateClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  getTask: (id: number) => void;
};

const Task: React.FC<IProps> = ({
  title,
  status,
  id,
  onUpdateClick,
  onDeleteClick,
  getTask,
}) => {
  return (
    <div
      onClick={() => getTask(id)}
      className='mb-6 flex justify-around rounded bg-white p-4 shadow-md hover:bg-slate-100'
    >
      <h2 className='mb-2 text-lg font-semibold'>{title}</h2>
      <span className='inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10'>
        {status}
      </span>
      <div
        className='cursor-pointer'
        data-testid='update-icon'
        onClick={(e) => {
          e.stopPropagation();
          onUpdateClick(id);
        }}
      >
        <FaPenToSquare />
      </div>
      <div
        className='cursor-pointer'
        data-testid='delete-icon'
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(id);
        }}
      >
        <FaTrash />
      </div>
    </div>
  );
};

export default Task;
