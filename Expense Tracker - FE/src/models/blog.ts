export type Article = {
  title: string;
  author: string;
  text: string;
  image?: string;
  id: string;
};

type Meta = {
  page: number;
  size: number;
  pageCount: number;
  total: number;
};

export type BlogDTO = {
  data: Article[];
  meta: Meta;
};
