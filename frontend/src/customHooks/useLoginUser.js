import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const useLogiUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (postData) => {
      const response = await fetch("http://localhost:3306/api/v1/user/login", {
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
      const responseData = await response.json();

      const { token } = responseData;

      localStorage.setItem("myAppToken", token);
      localStorage.setItem("userId", responseData.userId);

      return responseData;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Success");
    },
  });

  return { mutation };
};
