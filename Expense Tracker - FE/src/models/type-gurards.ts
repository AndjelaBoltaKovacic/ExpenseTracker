export const isContent = (data: any): boolean => {
  return data?.data?.hasOwnProperty('content');
};
