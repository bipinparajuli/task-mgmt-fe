"use client";
import Modal from "react-modal";
import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

import {
  useDeleteTaskMutation,
  useListTaskQuery,
  usePostTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/slice";
import { ITask } from "@/types/task.type";
import Task from "@/components/Task/Task";
import { customStyles } from "@/constants/const";
import { Button } from "@/components/ui/button";
import ModalContent from "@/components/Model/ModelContent";

export default function Home() {
  const [taskId, setTaskId] = useState(0);
  const [modalType, setModalType] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [createTask] = usePostTaskMutation();

  const response = useListTaskQuery();

  const onUpdateClick = (id: number) => {
    setShowModel(true);
    setTaskId(id);
    setModalType("update");
  };

  const onDeleteClick = (id: number) => {
    setShowModel(true);
    setTaskId(id);
    setModalType("delete");
  };

  const getTask = (id: number) => {
    setShowModel(true);
    setTaskId(id);
    setModalType("taskDetails");
  };

  const onCreateClick = () => {
    setShowModel(true);
    setModalType("create");
  };

  const closeModal = () => {
    setShowModel(false);
    setTaskId(0);
    setModalType("");
  };

  const onSubmit = (data: ITask, id?: number) => {
    if (id) {
      updateTask({
        id: id,
        title: data.title,
        description: data.description,
        status: data.status,
      });
    } else {
      createTask({
        title: data.title,
        description: data.description,
        status: data.status,
      });
    }

    closeModal();
  };

  const handleDelete = () => {
    setShowModel(false);
    deleteTask(taskId);
    closeModal();
  };
  return (
    <div className="container mx-auto p-4">
      <header className="sticky top-0 mb-4 flex justify-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold">Task List</h1>
        <Button onClick={onCreateClick}>Create Task</Button>
      </header>
      {response?.data && response.data?.length > 0 ? (
        response.data.map((task) => (
          <Task
            key={task.id}
            onUpdateClick={() => onUpdateClick(task.id)}
            onDeleteClick={() => onDeleteClick(task.id)}
            getTask={() => getTask(task.id)}
            {...task}
          />
        ))
      ) : (
        <div className="flex justify-center">
          <p>No task found</p>
        </div>
      )}
      <Modal
        isOpen={showModel}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="z-50 cursor-pointer" onClick={() => closeModal()}>
          <FaCircleXmark />
        </div>
        <ModalContent
          modalType={modalType}
          closeModal={closeModal}
          handleDelete={handleDelete}
          onSubmit={onSubmit}
          taskId={taskId}
        />
      </Modal>
    </div>
  );
}
