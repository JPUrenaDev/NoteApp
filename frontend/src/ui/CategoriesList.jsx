import React from "react";
import { ToggleList } from "../features/patterns/ToggleList";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const testData = [
  {
    category: "Businesss",
  },
  { category: "General" },
  { category: "prueba" },
  { category: "prueba" },
  { category: "prueba" },
  { category: "prueba" },
];
export const CategoriesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("categoryId"));
  return (
    <div>
      <ToggleList>
        <ToggleList.OpenCloseToggle label={"CATEGORIES"} />
        <ToggleList.ShowOptions
          data={testData}
          callback={(data) => (
            <Link to={`/note/${data.category}`}>{data.category}</Link>
          )}
        />
      </ToggleList>
    </div>
  );
};
