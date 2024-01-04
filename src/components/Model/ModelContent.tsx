import { ITask } from "@/types/task.type";
import { TaskForm } from "../TaskForm/TaskForm";
import DeleteModel from "@/components/Model/DeleteModel";
import TaskDetails from "@/components/Model/TaskDetailsModel";

type IProps = {
  modalType: string;
  closeModal: () => void;
  handleDelete: () => void;
  onSubmit: (data: ITask, id?: number) => void;
  taskId: number;
};

const ModalContent = ({
  modalType,
  closeModal,
  handleDelete,
  onSubmit,
  taskId,
}: IProps) => {
  switch (modalType) {
    case "create":
      return <TaskForm onSubmit={onSubmit} title="Add Task" />;
    case "update":
      return <TaskForm onSubmit={onSubmit} title="Update Task" id={taskId} />;
    case "taskDetails":
      return <TaskDetails id={taskId} />;
    case "delete":
      return (
        <DeleteModel closeModal={closeModal} handleDelete={handleDelete} />
      );
    default:
      return null;
  }
};

export default ModalContent;
