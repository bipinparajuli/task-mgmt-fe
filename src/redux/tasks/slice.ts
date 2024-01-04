import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { url } from "./const";
import { ITaskResponse, ICreateTask, ITaskUpdate } from "./tasks.interface";

export const taskApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API }),
  tagTypes: ["tasks", "task"],
  endpoints: (build) => ({
    postTask: build.mutation<ITaskResponse, ICreateTask>({
      query: (post) => ({
        url: url.task,
        method: "POST",
        body: post,
      }),
      invalidatesTags: [{ type: "tasks", id: "tasks" }],
    }),
    listTask: build.query<ITaskResponse[], void>({
      query: () => {
        return {
          url: url.task,
          method: "GET",
        };
      },
      providesTags: [{ type: "tasks", id: "tasks" }],
    }),
    getTask: build.query<ITaskResponse, number>({
      query: (id) => {
        return {
          url: `${url.task}/${id}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "task", id: "task" }],
    }),
    updateTask: build.mutation<ITaskResponse, ITaskUpdate>({
      query: (body) => ({
        url: `${url.task}/${body.id}`,
        method: "PATCH",
        body: {
          title: body.title,
          description: body.description,
          status: body.status,
        },
      }),
      invalidatesTags: [
        { type: "tasks", id: "tasks" },
        { type: "task", id: "task" },
      ],
    }),
    deleteTask: build.mutation<ITaskResponse, number>({
      query: (id) => ({
        url: `${url.task}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "tasks", id: "tasks" }],
    }),
  }),
});

export const {
  usePostTaskMutation,
  useListTaskQuery,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} = taskApi;
