import React from "react";

import { useGetTaskQuery } from "../../redux/slice";

const TaskDetails: React.FC<{ id: number }> = ({ id }) => {
  const response = useGetTaskQuery(id);
  if (response.isSuccess) {
    return (
      <div className="fixed inset-0 m-20 flex flex-col items-center justify-center">
        <div className="mx-auto max-w-md rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-2 text-xl font-bold">{response?.data?.title}</h2>
          <p className="mb-4 text-gray-700">{response?.data?.description}</p>
          <p className="text-gray-600">Status: {response?.data?.status}</p>
        </div>
      </div>
    );
  }
};

export default TaskDetails;
