import { useQuery } from "@tanstack/react-query";
export const useSelectAllNotes = ({ filterParam, userId }) => {
  console.log(filterParam);
  const { data } = useQuery({
    queryKey: ["notes", filterParam, userId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3306/api/v1/note?filter=${filterParam == "Active Notes" ? 1 : filterParam == "Archived Notes" ? 0 : ""}&userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("error getting the notess");
      }
      return response.json();
    },
  });

  return { data };
};
