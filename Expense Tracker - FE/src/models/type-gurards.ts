export const getContent = (data: any) => {
  return data?.data ?? data?.content ?? data;
};
