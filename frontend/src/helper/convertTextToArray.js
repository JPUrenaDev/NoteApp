export const convertTextToArray = ({ defaultValuesNote }) => {
  const tags = defaultValuesNote?.tags;
  const tagsToText = tags?.substring(1, tags.length - 1);
  const tagsToArray = tagsToText?.split(",");

  return tagsToArray;
};
