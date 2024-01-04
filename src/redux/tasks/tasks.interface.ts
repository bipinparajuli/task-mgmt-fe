export interface ITaskResponse {
  title: string;
  description: string;
  status: string;
  id: number;
}

export interface ICreateTask {
  title: string;
  description: string;
  status: string;
}

export interface ITaskUpdate extends ICreateTask {
  id: number;
}
