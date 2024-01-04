"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { STATUS_OPTIONS } from "@/constants/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useGetTaskQuery } from "@/redux/slice";

type IProps = {
  onSubmit: (data: any, id?: number) => void;
  title: string;
  id?: number;
};

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
});

export const TaskForm: React.FC<IProps> = ({ onSubmit, title, id }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
    },
  });

  let response: any;
  if (id) {
    response = useGetTaskQuery(id);
  }

  useEffect(() => {
    if (response?.isSuccess) {
      form.setValue("title", response.data.title);
      form.setValue("description", response.data.description);
      form.setValue("status", response.data.status);
    } else {
      form.setValue("status", STATUS_OPTIONS.TODO);
    }
  }, [response]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, id && id))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status:</FormLabel>
              <br />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select task status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(STATUS_OPTIONS).map((key) => (
                    <SelectItem value={key}>{key}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>{id ? "Update Task" : "Add Task"}</Button>
      </form>
    </Form>
  );
};
