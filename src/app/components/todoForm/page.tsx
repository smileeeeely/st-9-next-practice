"use Client";

interface AddMutation {
  id: string;
  title: string;
  contents: string;
  isCompleted: boolean;
  imgPath: string;
  createdAt: Date;
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async (newTodo) => {
      const response = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error(`Failed to post todo`);
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setTitle("");
    setContents("");
    addMutation.mutate({
      id: Date.now().toString(),
      title,
      contents,
      isCompleted: false,
      imgPath: "https://picsum.photos/250/250",
      createdAt: Date.now(),
    });
  };
  return <div>TodoForm</div>;
};

export default TodoForm;
