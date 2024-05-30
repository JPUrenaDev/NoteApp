import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export const useInsertNote = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const response = await fetch("http://localhost:3306/api/v1/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Error saving data");
      }

      /*
      const noteData = await response.json();
      const noteId = noteData.id;

      */
      //INSERTING TAGGS

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note inserted correctly");
    },
  });

  return { mutation };
};
