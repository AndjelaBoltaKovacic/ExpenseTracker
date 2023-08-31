export const getContent = (data: any) => {
  return data?.data?.content ?? data?.content ?? data;
};
