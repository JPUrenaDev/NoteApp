export const adjustingContent = (content) => {
  return content.length > 20 ? content.substring(0, 900) + "..." : content;
};
